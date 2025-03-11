import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { question } = await req.json();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `tell me ${question}`,
          },
        ],
      }),
    });

    const data = await res.json();

    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
};
