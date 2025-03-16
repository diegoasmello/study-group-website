import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.API_URL,
  documents: [
    "app/**/*.ts",
    "app/**/*.tsx",
    "app/**/*.graphql",
    "app/**/*.gql",
  ],
  generates: {
    "app/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
