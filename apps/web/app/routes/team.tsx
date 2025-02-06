import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import data from "~/data";
import { prisma } from "~/lib/prisma.server";

export const meta: MetaFunction = () => {
  return [
    { title: data.team.title + " | " + data.site.title },
    { name: "description", content: data.team.description },
  ];
};

export async function loader() {
  const teamMembers = await prisma.teamMember.findMany();
  return json({ teamMembers });
}

export default function Team() {
  const { teamMembers } = useLoaderData<typeof loader>();

  return (
    <main className="pb-20">
      <PageBanner
        title={data.team.title}
        text={data.team.description}
        illustration={
          <img
            src="/assets/illustrations/team.svg"
            alt=""
            className="h-[515px] max-w-max absolute top-[-95px] right-[-108px]"
          />
        }
        className="mb-8"
      />
      <Container>
        <section className="grid grid-cols-12 gap-x-8 gap-y-6">
          {teamMembers.map((teamMember) => (
            <div key={teamMember.id} className="col-span-12 lg:col-span-4">
              <CardTeamMember
                teamMember={{
                  name: teamMember.name,
                  label: "Auror",
                  image: teamMember.avatar,
                  link: teamMember.link,
                }}
              />
            </div>
          ))}
          <div className="col-span-12 flex justify-center mt-8 mb-10">
            <Paginator />
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
