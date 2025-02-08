import axios from "axios";
import { useModelStore } from "../store/modelStore";

interface OpenAIError extends Error {
  name: string;
}

export const fetchAvailableModels = async () => {
  try {
    const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error("Base URL and API Key are required");
    }

    const response = await axios.get(`${baseUrl}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    return response.data.data.map((model: any) => ({
      id: model.id,
      name: model.id.split(':').pop() || model.id,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

export const streamChatCompletion = async (
  messages: { role: string; content: string }[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) => {
  try {
    const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const model = useModelStore.getState().selectedModel?.id;

    if (!baseUrl || !apiKey || !model) {
      throw new Error("Base URL, API Key and Model are required");
    }

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
      signal,
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.choices[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }
  } catch (error) {
    const err = error as OpenAIError;
    if (err.name === 'AbortError') {
      console.log('Request aborted');
    } else {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }
}; 