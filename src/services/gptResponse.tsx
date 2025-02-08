import model from "../lib/gemini";
import { useChat } from "../store/chat";
import { ImgState } from "../types/types";
import { streamChatCompletion } from "./modelService";

// Helper function to map roles to OpenAI format
const mapRoleToOpenAI = (role: string): string => {
  // Convert role to lowercase and handle any specific mappings
  const lowerRole = role.toLowerCase();
  switch (lowerRole) {
    case 'model':
      return 'assistant';
    case 'user':
      return 'user';
    default:
      return 'user'; // Default fallback
  }
};

export const getResponse = async ({
  imgCopy,
  prop,
}: {
  imgCopy: ImgState;
  prop: string;
}): Promise<{
  res: string;
}> => {
  const { chats } = useChat.getState();
  const { setStreamingText } = useChat.getState();
  const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // If OpenAI configuration is available, use it
  if (baseUrl && apiKey) {
    try {
      let fullResponse = '';
      setStreamingText('');
      
      await streamChatCompletion(
        [
          ...chats.map(({ Role, Parts }) => ({
            role: mapRoleToOpenAI(Role),
            content: Parts[0].Text,
          })),
          { role: 'user', content: prop }
        ],
        (chunk) => {
          fullResponse += chunk;
          setStreamingText(fullResponse);
        }
      );

      setStreamingText('');
      return { res: fullResponse };
    } catch (err) {
      console.error(err);
      setStreamingText('');
      return { res: "An unexpected error occurred with OpenAI API" };
    }
  }

  // Fallback to Gemini if OpenAI is not configured
  try {
    const chat = model.startChat({
      history: chats?.map(({ Role, Parts }) => ({
        role: Role,
        parts: [{ text: Parts[0].Text }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    const result = await chat.sendMessage(
      Object.entries(imgCopy.aiData).length &&
        imgCopy.aiData.inlineData.data &&
        imgCopy.aiData.inlineData.mimeType
        ? [
            {
              inlineData: {
                data: imgCopy.aiData.inlineData.data,
                mimeType: imgCopy.aiData.inlineData.mimeType,
              },
            },
            prop,
          ]
        : [prop]
    );
    return { res: result.response.text() };
  } catch (err) {
    console.error(err);
    return { res: "An unexpected error occurred with Gemini API" };
  }
};
