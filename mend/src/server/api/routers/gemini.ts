// src/server/api/routers/gemini.ts
import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const geminiRouter = createTRPCRouter({
  getAdvice: publicProcedure
    .input(z.object({
      feelings: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        const prompt = `Here is my journal entry for today: ${input.feelings}, is there anything you can recommend I do or change to help me feel better? Keep the responses to 200 words maximum and do not use asterisks for formatting`;
        const result = await  model.generateContent(prompt);
        return {text:result.response.text()};
      } catch (error) {
        console.error("Error querying Gemini AI:", error);
        throw new Error('Error querying Gemini AI API');
      }
    }),
  getSampleAdvice: publicProcedure
    .query(() => {
      return "Here's a sample advice response!"; 
    }),
});

export default geminiRouter;
