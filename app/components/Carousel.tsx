import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

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
    <div className="relative -mx-4 px-4">
      <section className="embla overflow-x-hidden relative -mx-6 px-6">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex ml-[-32px]">
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
        className="embla__prev absolute top-[calc(50%-16px)] left-[-56px]"
        onClick={scrollPrev}
      >
        <MdArrowBackIos size={32} className="fill-gray-600" />
      </button>
      <button
        className="embla__next absolute top-[calc(50%-16px)] right-[-56px]"
        onClick={scrollNext}
      >
        <MdArrowForwardIos size={32} className="fill-gray-600" />
      </button>
      {/* <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div> */}
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
  emblaApi: EmblaCarouselType | undefined
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
