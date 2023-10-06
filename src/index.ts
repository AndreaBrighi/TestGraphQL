import 'graphql-import-node';
import 'graphql-import-node';
import fastify from "fastify";
import { getGraphQLParameters, processRequest, Request, sendResult } from "graphql-helix";
import { schema } from "./schema/schema";

async function main() {
  const server = fastify();

  server.route({
    method: "POST",
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      };

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        query,
        variables,
      });

      sendResult(result, reply.raw);
    }
  });

  server.listen(
    {port: 3000, host: "0.0.0.0"}, 
    () => {
    console.log(`Server is running on http://localhost:3000/`);
  });
}

main();