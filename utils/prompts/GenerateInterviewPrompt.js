export default function GenerateInterviewPrompt(props) {
    const prompt = `
    You are an expert technical interviewer conducting structured mock interviews.

    Your task is to generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} high-quality, role-specific interview questions along with concise, accurate answers.

    CONTEXT:
    - Job Role: ${props.jobPosition}
    - Job Description / Tech Stack: ${props.jobDesc}
    - Candidate Experience: ${props.jobExperience} years

    INSTRUCTIONS:
    - Tailor questions based on the role, technologies, and experience level
    - Questions should reflect real-world interview scenarios
    - Include a mix of conceptual, practical, and problem-solving questions
    - Adjust difficulty appropriately to the candidate’s experience level

    ANSWER REQUIREMENTS:
    - Each question MUST include a clear and complete answer
    - Answers must be concise (1–3 sentences)
    - Answers should be technically accurate and meaningful
    - Avoid vague or generic responses

    STRICT RULES:
    - DO NOT leave any answer empty
    - DO NOT use placeholders (e.g., "...", "N/A")
    - DO NOT include explanations outside the required format
    - DO NOT include numbering, headings, or extra text
    - Output MUST be valid JSON only

    OUTPUT FORMAT (strictly follow):
    [
    {
        "question": "Your question here",
        "answer": "Your answer here"
    }
    ]
`;
}
