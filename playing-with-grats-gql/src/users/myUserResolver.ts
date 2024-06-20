import { UserInfo } from "./UserInfo";
import { Query } from "../infrastructure/graphql/query";

/** @gqlField myUser */
export function myUserResolver(_: Query): Promise<UserInfo> {
  return Promise.resolve({
    id: "some-id",
    name: "carl"
  });
}
