import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: "https://api.z.ai/api/paas/v4",
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "glm-4.5-flash",
      messages: [
        { role: "system", content: "دستیار هوش مصنوعی برای آقای امیرعلی کاتبی هستی." },
        { role: "user", content: message },
      ],
      thinking: {},
    });

    const aiResponse = completion.choices[0].message.content;
    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI API error:", error);
    return new Response(JSON.stringify({ error: "AI API error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
