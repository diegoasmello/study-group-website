import "dotenv/config";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24; // 24 hours

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export { withAuth, session };
