
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const MAX_CODE_LENGTH = 20000;
const MODEL = "gemini-3.5-flash-lite";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const reviewInstructions: Record<string, string> = {
    full: "Perform a complete code review covering bugs, security, performance, code quality, recommendations, and improved code.",
    bugs: "Focus on logical errors, runtime exceptions, edge cases, and potential bugs.",
    security: "Focus on security vulnerabilities, unsafe practices, input validation, authentication, and data protection.",
    performance: "Focus on execution efficiency, time and space complexity, and performance bottlenecks.",
    optimization: "Focus on improving readability, maintainability, structure, and code efficiency.",
};

const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

async function generateReview(prompt: string) {
    const delays = [1000, 2000];

    for (let attempt = 0; attempt <= delays.length; attempt++) {
        try {
            return await ai.models.generateContent({
                model: MODEL,
                contents: prompt,
            });
        } catch (error: unknown) {
            const status =
                typeof error === "object" && error !== null && "status" in error
                    ? Number(error.status)
                    : 0;

            const retryable = status === 503 || status === 429;

            if (!retryable || attempt === delays.length) {
                throw error;
            }

            console.warn(
                `Gemini temporarily unavailable. Retry ${attempt + 1}/2...`
            );

            await wait(delays[attempt]);
        }
    }

    throw new Error("Gemini review failed after retries.");
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                { error: "Gemini API key is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { code, language, mode } = body;

        if (typeof code !== "string" || !code.trim()) {
            return Response.json(
                { error: "Please provide valid source code." },
                { status: 400 }
            );
        }

        if (code.length > MAX_CODE_LENGTH) {
            return Response.json(
                { error: "Code exceeds the maximum limit of 20,000 characters." },
                { status: 400 }
            );
        }

        if (typeof language !== "string" || !language.trim()) {
            return Response.json(
                { error: "Please select a programming language." },
                { status: 400 }
            );
        }

        if (typeof mode !== "string" || !reviewInstructions[mode]) {
            return Response.json(
                { error: "Please select a valid review type." },
                { status: 400 }
            );
        }

        const prompt = `
You are CodeLens AI, an expert software engineer and code reviewer.

Review the following ${language} code.

Review type:
${reviewInstructions[mode]}

Return your analysis in clear Markdown with these sections:

## Review Summary
Briefly summarize code quality and overall findings.

## Potential Bugs
Identify bugs, logical errors, runtime issues, and edge cases.
If none are found, explicitly say so.

## Security Analysis
Identify security vulnerabilities and unsafe practices.
If none are found, explicitly say so.

## Performance Analysis
Explain efficiency, complexity, and potential bottlenecks.

## Recommendations
Provide practical improvements and best practices.

## Improved Code
Provide a corrected or optimized version in a fenced code block.
Preserve the original functionality.

Important:
- Be specific and technically accurate.
- Do not invent issues.
- Explain why each issue matters.
- If the code is already good, say so honestly.

SOURCE CODE:
\`\`\`${language}
${code}
\`\`\`
`;

        const result = await generateReview(prompt);
        const review = result.text;

        if (!review) {
            return Response.json(
                { error: "Gemini returned an empty review. Please try again." },
                { status: 502 }
            );
        }

        return new Response(review, {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error: unknown) {
        console.error("Code review API error:", error);

        const status =
            typeof error === "object" && error !== null && "status" in error
                ? Number(error.status)
                : 0;

        if (status === 503 || status === 429) {
            return Response.json(
                {
                    error:
                        "Gemini is currently experiencing high demand. Please wait a moment and try again.",
                },
                { status: 503 }
            );
        }

        return Response.json(
            { error: "Unable to analyse your code. Please try again." },
            { status: 500 }
        );
    }
}
