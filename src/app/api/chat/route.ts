import { OpenAIApi, Configuration } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is loaded from env variables
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Request to OpenAI API with streaming enabled
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or the model you are using
      messages,
      stream: true, // Enable streaming
    });

    // Handle the streaming response
    const stream = completion; // Stream should be handled directly

    return new Response(stream.body, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API request failed:", error);
    return new Response(
      JSON.stringify({ error: "API request failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
