// lib/ai/groq.ts
export const callGroq = async (
  messages: any[],
  model = "llama-3.3-70b-versatile"
) => {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to call Groq API");
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content;
};
