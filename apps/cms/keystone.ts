import "dotenv/config";
import { config, graphql } from "@keystone-6/core";
import { session, withAuth } from "./auth";
import { lists } from "./schema";
import { static as static_ } from "express";
import { join } from "path";
import { KeystoneConfig } from "@keystone-6/core/types";

type GraphQLSchema = ReturnType<
  KeystoneConfig["graphql"]["extendGraphqlSchema"]
>;

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
        generateUrl: (path) => `http://localhost:3000/uploads${path}`,
        serverRoute: {
          path: "/uploads",
        },
        storagePath: "public/uploads",
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
    lists,
    graphql: {
      extendGraphqlSchema: graphql.extend((base) => {
        const SearchResult = graphql.union({
          name: "SearchResult",
          types: [
            base.object("Action"),
            base.object("Publication"),
            base.object("Event"),
            base.object("Project"),
          ],
          resolveType: (item) => (item as any).__typename,
        });

        const SearchResultConnection = graphql.object()({
          name: "SearchResultConnection",
          fields: {
            items: graphql.field({
              type: graphql.list(graphql.nonNull(SearchResult)),
              resolve: (root) => root.items,
            }),
            totalCount: graphql.field({
              type: graphql.Int,
              resolve: (root) => root.totalCount,
            }),
          },
        });
        return {
          types: [SearchResult, SearchResultConnection],
          query: {
            search: graphql.field({
              type: SearchResultConnection,
              args: {
                query: graphql.arg({ type: graphql.String }),
                skip: graphql.arg({ type: graphql.Int, defaultValue: 0 }),
                take: graphql.arg({ type: graphql.Int, defaultValue: 10 }),
              },
              async resolve(root, { query, skip, take }, context) {
                const [actions, publications, events, projects] =
                  await Promise.all([
                    context.db.Action.findMany({
                      where: {
                        status: { equals: "published" },
                        title: { contains: query, mode: "insensitive" },
                      },
                    }),
                    context.db.Publication.findMany({
                      where: {
                        status: { equals: "published" },
                        title: { contains: query, mode: "insensitive" },
                      },
                    }),
                    context.db.Event.findMany({
                      where: {
                        status: { equals: "published" },
                        title: { contains: query, mode: "insensitive" },
                      },
                    }),
                    context.db.Project.findMany({
                      where: {
                        status: { equals: "published" },
                        title: { contains: query, mode: "insensitive" },
                      },
                    }),
                  ]);

                const allResults = [
                  ...actions.map((item) => ({ ...item, __typename: "Action" })),
                  ...publications.map((item) => ({
                    ...item,
                    __typename: "Publication",
                  })),
                  ...events.map((item) => ({ ...item, __typename: "Event" })),
                  ...projects.map((item) => ({
                    ...item,
                    __typename: "Project",
                  })),
                ];

                allResults.sort((a, b) =>
                  a.publishedAt < b.publishedAt ? 1 : -1,
                );

                const totalCount = allResults.length;
                const paginatedResults = allResults.slice(skip, skip + take);

                return {
                  items: paginatedResults,
                  totalCount,
                };
              },
            }),
          },
        };
      }),
    },
  }),
);
