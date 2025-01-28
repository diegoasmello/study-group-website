import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { Container } from "./Container";
import { Button } from "./Button";
import { MdArrowRightAlt } from "react-icons/md";
import cardImage from "~/images/card-image.png";
import { useCallback } from "react";

// todo: add autoplay
export function CarouselHome() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 38 });

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
      <div className="embla__viewport overflow-hidden h-[554px]" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide flex-[0_0_100%] -pl-8">
            <Item />
          </div>
          <div className="embla__slide flex-[0_0_100%] -pl-8">
            <Item />
          </div>
          <div className="embla__slide flex-[0_0_100%] -pl-8">
            <Item />
          </div>
        </div>
      </div>
      <Container className="flex items-center justify-between">
        <nav className="flex flex-row gap-4">
          <button className="embla__prev group" onClick={scrollPrev}>
            <MdArrowRightAlt
              size={32}
              className="fill-gray-950 group-disabled:fill-gray-300 group-hover:fill-primary"
            />
          </button>
          <button className="embla__next group" onClick={scrollNext}>
            <MdArrowRightAlt
              size={32}
              className="fill-gray-950 group-disabled:fill-gray-300 group-hover:fill-primary"
            />
          </button>
        </nav>
        <nav className="flex justify-center w-full gap-6 mt-6">
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

const Item = () => {
  return (
    <section className="w-full relative">
      <Container>
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-medium">Ação</span>
                <span className="text-h1-display">
                  Curso de Letras realiza palestras e encontros on-line
                </span>
                <p className="text-lead-1 text-gray-800">
                  Confira a programação de atividades já prevista para o mês de
                  dezembro e outros encontros que ainda estão sendo preparados.{" "}
                </p>
              </div>
              <Button>Saiba mais</Button>
            </div>
          </div>
        </section>
      </Container>
      <img
        src={cardImage}
        alt={"dawdwa"}
        className="h-[554px] w-[50vw] object-cover absolute top-0 right-0 rounded-l-[56px]"
        // className="h-[554px] w-[calc(50vw+32px)] object-cover absolute top-0 right-[-32px] rounded-[56px]"
      />
    </section>
  );
};
