import { z } from "zod";

const envSchema = z.object({
  uptashRedisUrl:   z.string().min(1),
  uptashRedisToken: z.string().min(1),
});

const createEnv = (env: z.infer<typeof envSchema>) => envSchema.parse({...env});

export const env = createEnv({
  uptashRedisUrl:   process.env.UPSTASH_REDIS_REST_URL!,
  uptashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
})