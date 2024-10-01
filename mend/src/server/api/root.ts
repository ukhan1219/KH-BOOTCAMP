// import {  } from "~/server/api/routers/";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import geminiRouter from "./routers/gemini";

export const appRouter = createTRPCRouter({
    gemini: geminiRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
