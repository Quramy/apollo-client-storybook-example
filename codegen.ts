import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "src/gql/": {
      preset: "client",
    },
    "src/__generated__/fabbrica.ts": {
      plugins: [
        "@mizdra/graphql-codegen-typescript-fabbrica",
        {
          add: {
            placement: "append",
            content:
              "// FIXME suppress TS noUnusedLocals error\n" +
              "export type _M = Maybe<unknown>;",
          },
        },
      ],
      config: {
        typesFile: "../gql/graphql",
      },
    },
  },
};

export default config;
