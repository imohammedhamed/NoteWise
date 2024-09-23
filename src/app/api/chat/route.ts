import { OpenAIApi, Configuration } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    let retries = 0;
    const maxRetries = 5;
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    while (retries < maxRetries) {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", // or "gpt-4"
        messages,
        stream: true,
      });

      if (completion.status !== 429) {
        return new Response(completion.body, {
          headers: { "Content-Type": "application/json" },
        });
      }

      console.warn(`Rate limit hit, retrying... (${retries + 1}/${maxRetries})`);
      // await delay(2000 * (retries + 1));
      await delay(5000 * (retries + 1)); 
      retries++;
    }

    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
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
