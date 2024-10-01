// src/server/api/routers/gemini.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const geminiRouter = createTRPCRouter({
  // New procedure to get advice based on user input
  getAdvice: publicProcedure
    .input(z.object({
      feelings: z.string(),
      happened: z.string(),
      wished: z.string(),
    }))
    .mutation(async ({ input }) => {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Feelings: ${input.feelings}, What happened: ${input.happened}, What I wished: ${input.wished}`,
          maxTokens: 100, // Adjust maxTokens as needed
        }),
      });

      const data = await response.json();
      const advice = data.choices[0]?.text || 'No advice available at the moment';

      return { advice };
    }),

  // Additional methods can be added here if needed, for example:
  getSampleAdvice: publicProcedure
    .query(() => {
      return "Here's a sample advice response!"; // Placeholder
    }),
});

export default geminiRouter;
