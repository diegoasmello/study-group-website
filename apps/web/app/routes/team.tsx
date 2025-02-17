import { Prisma, Sections, TeamMember } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import { prisma } from "~/lib/prisma.server";
import { createPaginator, getRootMatch } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const {
    data: { title },
  } = getRootMatch(matches);

  return [
    { title: data?.heroSection?.title + " | " + title },
    { name: "description", content: data?.heroSection?.content },
  ];
};

const paginate = createPaginator({ perPage: 9 });

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");

  const heroSection = await prisma.sectionsContent.findFirst({
    where: {
      section: Sections.TEAM_HERO,
    },
  });
  const paginatedTeamMembers = await paginate<
    TeamMember,
    Prisma.TeamMemberFindManyArgs
  >(
    prisma.teamMember,
    {},
    {
      page: page,
    },
  );
  return json({ paginatedTeamMembers, heroSection });
}

export default function Team() {
  const {
    heroSection,
    paginatedTeamMembers: { data: teamMembers, meta: paginatedMeta },
  } = useLoaderData<typeof loader>();

  if (!heroSection) return null;

  return (
    <main className="pb-20">
      <PageBanner
        title={heroSection.title}
        text={heroSection.content}
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
                  role: teamMember.role,
                  image: teamMember.image,
                  link: teamMember.link,
                }}
              />
            </div>
          ))}
          <div className="col-span-12 flex justify-center mt-8 mb-10">
            <Paginator {...paginatedMeta} />
          </div>
          <div className="col-span-12">
            <NewsletterBanner />
          </div>
        </section>
      </Container>
    </main>
  );
}
