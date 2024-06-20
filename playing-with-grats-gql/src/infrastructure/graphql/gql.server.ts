import { YogaInitialContext, createYoga } from "graphql-yoga";
import { getSchema } from "./schema/schema";
import { Redis } from "@upstash/redis";
import { connectToRedis } from "../redis";

export type AppContext = {
  request: Request
  redis: Redis,
}

const buildContext = (initialContext: YogaInitialContext): AppContext => ({
  request: initialContext.request,
  redis: connectToRedis(),
})

export const yoga = createYoga({ 
  schema: getSchema(),
  context: buildContext
});