import { getGroqChat } from "../../../../utils/Groq";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await getGroqChat(prompt); // ✅ await

    //console.log(response);
    const data=response.choices[0]?.message?.content;
    //console.log(data);

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    //console.error("API ERROR:", error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}