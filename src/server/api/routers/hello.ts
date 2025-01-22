import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const helloRouter = createTRPCRouter({
  hi: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hi ${input.text}`,
      };
    }),
});
