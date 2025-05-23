import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { IconChevronLeft, IconChevronRight } from "./icons";

interface CarouselProps {
  children: (isSlideInView: (index: number) => boolean) => React.ReactNode;
}

export function Carousel({ children }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
    duration: 36,
  });

  const [currentSlidesInView, setCurrentSlidesInView] = useState<number[]>([
    0, 1, 2,
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const isSlideInView = (index: number) => currentSlidesInView.includes(index);

  const onSlidesInView = useCallback(() => {
    const slidesInView = emblaApi?.slidesInView() ?? [];
    setCurrentSlidesInView(slidesInView.slice(0, 3));
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.on("slidesInView", onSlidesInView);
  }, [emblaApi, onSlidesInView]);

  return (
    <div className="relative lg:-mx-4 lg:px-4">
      <section className="embla overflow-x-hidden relative mx-0 px-0 lg:-mx-6 lg:px-6 pb-2 -mb-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex ml-[-2rem]">
            {children(isSlideInView)}
          </div>
        </div>
        <nav className="flex justify-center w-full gap-6 mt-6">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isActive={selectedIndex == index}
            />
          ))}
        </nav>
      </section>
      <button
        className="embla__prev absolute top-[calc(50%-1rem)] left-[-3.5rem] hidden lg:block cursor-pointer"
        onClick={scrollPrev}
      >
        <IconChevronLeft className="size-8 text-gray-600" />
      </button>
      <button
        className="embla__next absolute top-[calc(50%-1rem)] right-[-3.5rem] hidden lg:block cursor-pointer"
        onClick={scrollNext}
      >
        <IconChevronRight className="size-8 text-gray-600" />
      </button>
    </div>
  );
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
