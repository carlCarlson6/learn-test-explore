import { Redis } from "@upstash/redis";
import { env } from "./env";

export const connectToRedis = () => new Redis({
  url: env.uptashRedisUrl,
  token: env.uptashRedisToken
});