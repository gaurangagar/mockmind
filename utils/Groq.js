import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function main(prompt) {
//   const chatCompletion = await getGroqChat(prompt);
//   // Print the completion returned by the LLM.
//   //console.log(chatCompletion.choices[0]?.message?.content || "");
//   const content = chatCompletion.choices[0]?.message?.content;
//   if (!content) {
//     console.error("No response from model");
//   } else {
//     console.log(content);
//   }
//   //console.log(content);
//   // const parsed = JSON.parse(content);
//   // console.log(parsed);
// }

export async function getGroqChat(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

// main();