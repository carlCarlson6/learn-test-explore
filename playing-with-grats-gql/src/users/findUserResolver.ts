import { UserInfo } from "./UserInfo";
import { AppContext } from "../infrastructure/graphql/gql.server";
import { Query } from "../infrastructure/graphql/query";
import { Redis } from "@upstash/redis";

/** @gqlInput */
type FindUserInput= {
  name: string
}

/** @gqlField findUser */
export function findUserResolver(
  _: Query, 
  args: { input: FindUserInput },
  context: AppContext 
): Promise<UserInfo|null> {
  return findUserByName(context.redis)(args.input.name);
}

const findUserByName = (redis: Redis) => (userName: string) => redis.get<UserProfile>(`profiles/${userName}`);

type UserProfile = {
  id: string,
  name: string
}