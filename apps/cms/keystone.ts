import "dotenv/config";
import { config } from "@keystone-6/core";
import { session, withAuth } from "./auth";
import { lists } from "./schema";
import { static as static_ } from "express";
import { join } from "path";

export default config(
  withAuth({
    server: {
      extendExpressApp: (app) => {
        app.use("/assets", static_(join(process.cwd(), "public/assets")));
      },
    },
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
