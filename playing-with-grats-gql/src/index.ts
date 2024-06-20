require('dotenv').config();
import { createServer } from "node:http";
import { yoga } from "./infrastructure/graphql/gql.server";

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("running a grapqql api server at /graphql");
});