import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { Container } from "./Container";

import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { IconArrowAltBack, IconArrowAltForward } from "./icons";
import { ButtonLink } from "./ButtonLink";

export type CarouselHomeItem = {
  id: number;
  type: "action" | "event";
  slug: string;
  title: string;
  description: string;
  image: string;
  date: number;
};

export function CarouselHome({ items }: { items: CarouselHomeItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 38 }, [
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="embla w-full">
      <div
        className="embla__viewport overflow-hidden lg:h-[35rem]"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {items.map((item) => (
            <div
              key={item.type + item.id}
              className="embla__slide flex-[0_0_100%] -pl-8"
            >
              <Item item={item} />
            </div>
          ))}
        </div>
      </div>
      <Container className="flex items-center justify-between mt-6">
        <nav className="flex-row gap-4 hidden lg:flex">
          <button className="embla__prev group" onClick={scrollPrev}>
            <IconArrowAltBack className="size-8 text-gray-950 group-disabled:text-gray-300 group-hover:text-primary" />
          </button>
          <button className="embla__next group" onClick={scrollNext}>
            <IconArrowAltForward className="size-8 text-gray-950 group-disabled:text-gray-300 group-hover:text-primary" />
          </button>
        </nav>
        <nav className="flex justify-center w-full gap-6">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isActive={selectedIndex == index}
            />
          ))}
        </nav>
      </Container>
    </section>
  );
}

const Item = ({ item }: { item: CarouselHomeItem }) => {
  return (
    <section className="w-full relative">
      <Container>
        <img
          src={item.image}
          alt={item.title}
          className="object-cover rounded-3xl w-full mb-4 lg:mb-0 lg:rounded-r-none lg:rounded-l-[3.5rem] lg:h-[35rem] lg:w-[50vw] lg:absolute lg:top-0 lg:right-0"
        />
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-medium">
                  {item.type === "action" ? "Ação" : "Evento"}
                </span>
                <span className="text-h1-display line-clamp-4">
                  {item.title}
                </span>
                <p className="text-lead-1 text-gray-800 line-clamp-5">
                  {item.description}
                </p>
              </div>
              <ButtonLink
                to={
                  item.type === "action"
                    ? `/actions/${item.slug}`
                    : `/events/${item.slug}`
                }
              >
                Saiba mais
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};
