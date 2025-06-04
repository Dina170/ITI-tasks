const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const root = require("./resolver");
const { createHandler } = require("graphql-http/lib/use/express");
const schema2 = require("./schema-classes");
const errorHandler = require("./errorHandler");

const app = express();

app.use(
  "/api/v1",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(
  "/api/v2",
  createHandler({
    schema: schema2,
    formatError(err) {
      console.error("GraphQL Error:", err);
      return {
        message: err.message,
        status: err.status || 500,
      };
    },
  })
);

app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 GraphQL API running at http://localhost:${PORT}/api/v2`);
});
