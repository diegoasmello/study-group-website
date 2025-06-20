import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { CardTeamMember } from "~/components/CardTeamMember";
import { Carousel } from "~/components/Carousel";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";
import { IconArrowForward } from "~/components/icons";
import clsx from "clsx";
import { getRootMatch, metaTags } from "~/utils";
import { LoaderFunctionArgs } from "@remix-run/node";
import { NoResults } from "~/components/NoResults";
import { useTranslation } from "react-i18next";
import { getHistory } from "~/api/history";

export const meta: MetaFunction<typeof loader> = ({
  data: dbData,
  matches,
  location,
}) => {
  const {
    data: { company },
  } = getRootMatch(matches);

  return metaTags({
    title: "Our history | " + company?.title,
    description: dbData?.historySection?.content,
    pathname: location.pathname,
    url: dbData?.url,
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { history, historySection, homeSection, teamMembers } =
    await getHistory();

  return json({
    history,
    teamMembers,
    historySection,
    homeSection,
    url: request.url,
  });
}

export default function History() {
  const { history, historySection, homeSection, teamMembers } =
    useLoaderData<typeof loader>();

  const { t } = useTranslation();

  if (!historySection || !history || !homeSection)
    return (
      <div className="py-20">
        <NoResults text={t("History.empty")} />
      </div>
    );

  const historyList: Array<{ title: string; content: string }> = [
    { title: history.titleOne, content: history.contentOne },
    { title: history.titleTwo, content: history.contentTwo },
    { title: history.titleThree, content: history.contentThree },
    { title: history.titleFour, content: history.contentFour },
    { title: history.titleFive, content: history.contentFive },
  ];

  return (
    <main className="pb-20 bg-page">
      <div className="bg-primary-lighter pt-14 pb-16 mb-12 relative overflow-hidden">
        <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-2 col-span-12 col-start-1 lg:col-span-4 lg:col-start-7">
            <h1 className="text-primary font-medium">{historySection.title}</h1>
            <span className="text-h2">{homeSection.title}</span>
            <p className="text-lead-1 text-gray-800">
              {historySection.content}
            </p>
          </div>
        </Container>
        <img
          src="/assets/illustrations/history.svg"
          alt=""
          className="h-[574px] max-w-max absolute top-[-50px] left-[-270px] 2xl:top-[-110px] 2xl:left-[-66px] hidden lg:block"
        />
      </div>

      <Container className="grid gap-y-20">
        {historyList.map((historyListItem, index) => (
          <HistorySection
            key={index}
            index={index}
            section={historyListItem}
            align={index % 2 === 0 ? "right" : "left"}
            isLastItem={index === historyList.length - 1}
          />
        ))}
      </Container>

      <Container>
        {!!teamMembers?.length && (
          <div className="mt-20">
            <div className="flex flex-col gap-8 mb-14">
              <h2 className="text-h3 text-gray-950">
                {t("History.teamTitle")}
              </h2>
              <div className="w-full">
                <Carousel>
                  {(isSlideInView) =>
                    teamMembers.map((teamMember, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-[0_0_100%] lg:flex-[0_0_33.3333%] pl-[2rem] min-w-0 "
                      >
                        <CardTeamMember
                          type="float"
                          hideShadow={!isSlideInView(index)}
                          teamMember={{
                            name: teamMember.name,
                            role: teamMember.role,
                            image: teamMember.image.url,
                            link: teamMember.link,
                          }}
                        />
                      </div>
                    ))
                  }
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/team">
                {t("History.teamLinkLabel")}{" "}
                <IconArrowForward className="size-5" />
              </Link>
            </div>
          </div>
        )}
        <NewsletterBanner className="mt-20" />
      </Container>
    </main>
  );
}

const HistorySection = (props: {
  section: { title: string; content: string };
  align: "left" | "right";
  index: number;
  isLastItem: boolean;
}) => {
  const { section, align, index, isLastItem } = props;

  const { illustration1, illustration2 } = historyIllustrations[index];

  if (isLastItem)
    return (
      <div className="grid grid-cols-12 gap-y-8 lg:gap-y-0 gap-x-8">
        <div className="col-span-12 lg:col-span-3 flex items-center justify-center">
          <img src={illustration1} alt={section.title + " - 1"} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-h2 text-gray-950 text-center">{section.title}</h2>
          <p className="text-gray-800 text-center">{section.content}</p>
        </div>
        <div className="col-span-12 lg:col-span-3 items-center justify-center hidden lg:flex">
          <img src={illustration2} alt={section.title + " - 2"} />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-12 gap-y-8 lg:gap-y-0 gap-x-4">
      <div
        className={clsx(
          "col-span-12 lg:col-span-6 flex items-center justify-center",
          align === "left" ? "lg:order-1" : "lg:order-2",
        )}
      >
        <img
          src={illustration1}
          alt={section.title}
          className="w-[60vw] lg:w-auto lg:h-[260px]"
        />
      </div>
      <div
        className={clsx(
          "col-span-12 lg:col-span-6 flex flex-col justify-center gap-6 py-4",
          align === "left" ? "lg:order-2" : "lg:order-1",
        )}
      >
        <h2 className="text-h2 text-gray-950 text-center lg:text-left">
          {section.title}
        </h2>
        <p className="text-gray-800 text-center lg:text-left">
          {section.content}
        </p>
      </div>
    </div>
  );
};

type HistorySectionIllustration = {
  illustration1: string;
  illustration2?: string;
};

const historyIllustrations: HistorySectionIllustration[] = [
  {
    illustration1: "/assets/illustrations/history-step-1.svg",
  },
  {
    illustration1: "/assets/illustrations/history-step-2.svg",
  },
  {
    illustration1: "/assets/illustrations/history-step-3.svg",
  },
  {
    illustration1: "/assets/illustrations/history-step-4.svg",
  },
  {
    illustration1: "/assets/illustrations/history-step-5-1.svg",
    illustration2: "/assets/illustrations/history-step-5-2.svg",
  },
];
