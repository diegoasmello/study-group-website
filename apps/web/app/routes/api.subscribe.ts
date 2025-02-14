import { ActionFunction, json } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return json({ error: "E-mail inválido" }, { status: 400 });
  }

  try {
    await prisma.newsletterList.create({
      data: { email },
    });
  } catch (e) {
    return json({ error: "Error" }, { status: 400 });
  }

  return json({ success: true });
};
