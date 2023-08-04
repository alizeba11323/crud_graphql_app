const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const http = require("http");
const cors = require("cors");
const { consola } = require("consola");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { resolvers, typeDefs } = require("./src/graphql");
const Post = require("./src/models/post");
const User = require("./src/models/user");
const { PORT } = require("./src/config");
const connectDB = require("./src/functions/db");
(async function () {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ schema });
  await server.start();
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: () => {
        return {
          postContext: Post,
          userContext: User,
        };
      },
    })
  );
  httpServer.listen(PORT, function () {
    connectDB();
    consola.success({
      message: "App running on http://localhost:4000/graphql",
      badge: true,
    });
  });
})();
