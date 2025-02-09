export interface ImageGenerationRequest {
  model_name: string;
  prompt: string;
  steps: number;
  cfg_scale: number;
  enable_refiner: boolean;
  height: number;
  width: number;
  backend: string;
}

interface ImageGenerationResponse {
  success: boolean;
  data: {
    images: string[]; // base64 encoded images
  };
  error?: string;
}

export const generateImage = async (request: ImageGenerationRequest): Promise<string> => {
  const url = "https://api.hyperbolic.xyz/v1/image/generation";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_HYPERBOLIC_API_KEY}`
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.statusText}`);
    }

    const result: ImageGenerationResponse = await response.json();
    
    if (!result.success || !result.data.images?.[0]) {
      throw new Error(result.error || 'Failed to generate image');
    }

    return result.data.images[0];
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};