
import { GoogleGenAI, Type } from "@google/genai";
import { InterviewQA } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
 
const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: 'A challenging, relevant and most asked interview question about the topic.'
      },
      answer: {
        type: Type.STRING,
        description: 'A detailed, expert-level answer to the question, suitable for interview preparation.'
      },
    },
    required: ['question', 'answer'],
  },
};

export const generateInterviewQuestions = async (topic: string): Promise<InterviewQA[]> => {
  try {
    const prompt = `Generate 15-20 insightful interview questions and detailed answers for the topic: "${topic}". The questions should cover fundamental concepts, advanced topics, and practical applications. The answers should be comprehensive and clear.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as InterviewQA[];
    return result;

  } catch (error) {
    console.error("Error generating interview questions:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate questions. Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating questions.");
  }
};
