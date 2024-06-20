import { Redis } from "@upstash/redis";
import { AppContext } from "../infrastructure/graphql/gql.server";
import { Mutation } from "../infrastructure/graphql/mutation";
import { UserInfo } from "../users/UserInfo";
import z from "zod";
import { hashPassword } from "./passwords";
import { randomUUID } from "crypto";

/** @gqlInput */
type SignUserInput = {
  name: string,
  password: string
}

/** @gqlType */
type SignUserResult = {
  /** @gqlField */
  user: UserInfo,
  /** @gqlField */
  authToken: string
}

/** @gqlField signUser */
export function signUserResolver(
  _: Mutation, 
  args: {input: SignUserInput},
  context: AppContext,
): Promise<SignUserResult> {
  return signUser(context.redis)(args.input);
}

const signUser = (redis: Redis) => async (
  userCredentials: { name: string, password: string }
) => {
  await validateCredentialsRequirements(userCredentials);
  await checkUserNameIsAvailable(redis, userCredentials.name);
  const user = await storeUser(redis)(userCredentials);
}

const validateCredentialsRequirements = async (user: { name: string, password: string }) => {
  const {success} = await z.object({
    name: z.string().min(1),
    password: z.string().min(1)
  }).safeParseAsync(user);
  if (!success) throw new Error('invalid credentials requirements');
}

const checkUserNameIsAvailable = async (redis: Redis, userName: string) => {
  const result = await redis.exists(`profiles/${userName}`)
  if (result > 0) throw new Error('invalid credentials');
}

const storeUser = (redis: Redis) => async (user: { name: string, password: string }) => {
  const hashedPassword = hashPassword(user.password);
  const id = randomUUID();
  await redis.set(`auth/${id}`, { id, name: user.name, hashedPassword });
  return { id, name: user.name };
}

const generateJwt = () => {
  
}