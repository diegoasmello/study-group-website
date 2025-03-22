import {
  NavigationContainer,
  NavItem as NavLink,
  ListNavItem,
  ListNavItems,
} from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import { NavDropdown } from "./NavDropdown";

export function Navigation({ authenticatedItem, lists }: NavigationProps) {
  const {
    Action,
    Project,
    Event,
    Publication,
    TeamMember,
    ResearchArea,
    Researcher,
    SectionContent,
    HomeSection,
    ResearchSection,
    TeamSection,
    HistorySection,
    PublicationsSection,
    EventsSection,
    ActionsSection,
    ProjectsSection,
    Company,
    NewsletterList,
    User,
    History,
  } = Object.fromEntries(lists.map((list) => [list.key, list]));

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <ListNavItem key={Action.key} list={Action} />
      <ListNavItem key={Project.key} list={Project} />
      <ListNavItem key={Event.key} list={Event} />
      <ListNavItem key={Publication.key} list={Publication} />
      <ListNavItem key={TeamMember.key} list={TeamMember} />
      <ListNavItem key={ResearchArea.key} list={ResearchArea} />
      <ListNavItem key={Researcher.key} list={Researcher} />
      <ListNavItem key={History.key} list={History} />
      <ListNavItem key={Company.key} list={Company} />
      <NavDropdown
        lists={[
          HomeSection,
          ResearchSection,
          TeamSection,
          HistorySection,
          PublicationsSection,
          EventsSection,
          ActionsSection,
          ProjectsSection,
        ]}
      >
        Site Content
      </NavDropdown>
      <ListNavItem key={NewsletterList.key} list={NewsletterList} />
      <ListNavItem key={User.key} list={User} />
    </NavigationContainer>
  );
}

const dropdownItems = [
  "HomeSection",
  "ResearchSection",
  "TeamSection",
  "HistorySection",
  "PublicationsSection",
  "EventsSection",
  "ActionsSection",
  "ProjectsSection",
];
