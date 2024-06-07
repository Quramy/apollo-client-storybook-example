const { printSchema } = require("graphql");

module.exports = {
  plugin: (_, documents) => {
    return (
      "export const typeDefs = /* GraphQL */ `\n" + printSchema(_) + "\n`;"
    );
  },
};
