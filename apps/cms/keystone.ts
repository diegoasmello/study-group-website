import "dotenv/config";
import { config } from "@keystone-6/core";
import { session, withAuth } from "./auth";
import { lists } from "./schema";

export default config(
  withAuth({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
      prismaClientPath: "node_modules/.prisma/client",
    },
    storage: {
      local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
    lists,
  }),
);
