import {
  ProjectDocument,
  ProjectPaginatedDocument,
  ProjectPaginatedQuery,
  ProjectPaginatedQueryVariables,
  ProjectQuery,
  ProjectQueryVariables,
  ProjectRelatedDocument,
  ProjectRelatedQuery,
  ProjectRelatedQueryVariables,
  ProjectSectionDocument,
  ProjectSectionQuery,
} from "~/graphql/generated";
import { client } from "~/lib/graphql-client.server";
import { getRelatedTermsWhereInput } from "~/utils";
import { paginate } from "~/utils/paginator.server";

export async function getProject(slug: string) {
  const { project } = await client.request<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    { slug },
  );
  return project;
}

export async function getProjectSection() {
  const { projectsSection } = await client.request<ProjectSectionQuery>(
    ProjectSectionDocument,
  );
  return projectsSection;
}

export async function getProjectRelated(id: string, terms: string[]) {
  const { projects } = await client.request<
    ProjectRelatedQuery,
    ProjectRelatedQueryVariables
  >(ProjectRelatedDocument, {
    id,
    terms: getRelatedTermsWhereInput(terms),
  });

  return projects;
}

export async function getProjectPaginated(page: number) {
  const paginatedProjects = await paginate<
    ProjectPaginatedQuery["data"],
    ProjectPaginatedQueryVariables
  >({
    query: ProjectPaginatedDocument,
    pageInfo: {
      currentPage: page,
      perPage: 6,
    },
  });

  return paginatedProjects;
}
