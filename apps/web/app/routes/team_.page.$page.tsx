import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Container } from "~/components/Container";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { PageBanner } from "~/components/PageBanner";
import { Paginator } from "~/components/Paginator";
import {
  TeamPageQueryVariables,
  TeamPageHeroQuery,
  TeamPageQuery,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { getRootMatch, handleNotFound, metaTags } from "~/utils";
import { paginate } from "~/utils/paginator.server";

const pageQuery = gql`
  query TeamPage($take: Int, $skip: Int) {
    data: teamMembers(
      take: $take
      skip: $skip
      where: { status: { equals: published } }
    ) {
      id
      name
      role
      link
      image {
        url
      }
    }
    count: teamMembersCount(where: { status: { equals: published } })
  }
`;

const heroQuery = gql`
  query TeamPageHero {
    sectionContents(where: { section: { equals: TEAM_HERO } }) {
      id
      title
      content
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const {
    data: { company },
  } = getRootMatch(matches);

  return metaTags({
    title: data?.heroSection?.title + " | " + company?.title,
    description: data?.heroSection?.content,
    pathname: location.pathname,
    url: data?.url,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const page = params.page ? Number(params.page) : 1;

  const paginatedTeamMembers = await paginate<
    TeamPageQuery["data"],
    TeamPageQueryVariables
  >(pageQuery, {
    currentPage: page,
    perPage: 9,
  });

  handleNotFound(paginatedTeamMembers?.data?.length);

  const { sectionContents } =
    await client.request<TeamPageHeroQuery>(heroQuery);

  return json({
    paginatedTeamMembers,
    heroSection: sectionContents?.[0],
    url: request.url,
  });
}

export default function Team() {
  const {
    heroSection,
    paginatedTeamMembers: { data: teamMembers, meta: paginatedMeta },
  } = useLoaderData<typeof loader>();

  if (!heroSection || !teamMembers) return null;

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
                  image: teamMember.image.url,
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
