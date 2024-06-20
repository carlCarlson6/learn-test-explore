import { Mutation } from "../infrastructure/graphql/mutation";
import { UserInfo } from "../users/UserInfo";

/** @gqlInput */
type LoginUserInput = {
  name: string,
  password: string
}

/** @gqlType */
type LoginUserResult = {
  /** @gqlField */
  user: UserInfo,
  /** @gqlField */
  authToken: string
}

/** @gqlField loginUser */
export function loginUserResolver(
  _: Mutation, 
  args: { input: LoginUserInput; }
): Promise<LoginUserResult> {
  throw new Error("");
}
