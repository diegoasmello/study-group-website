import { MdArrowForward } from "react-icons/md";
import { Container } from "~/components/Container";
import { Link } from "~/components/Link";
import { NewsletterBanner } from "~/components/NewsletterBanner";

export default function History() {
  return (
    <main className="pb-20">
      <div className="bg-primary-lighter pt-14 pb-16 mb-8">
        <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-6" />
          <div className="flex flex-col gap-2 col-span-4">
            <h1 className="text-primary font-medium">Nossa história</h1>
            <span className="text-h2">
              Novos rumos para o ensino de língua em tempos de globalização
            </span>
            <p className="text-lead-1 text-gray-900">
              Conheça nossa história e compreenda a jornada que moldou nossa
              identidade.
            </p>
          </div>
        </Container>
      </div>
      <Container className="grid grid-cols-12 gap-x-8 gap-y-6">
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">Origens inspiradoras</h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col col-span-6"></div>
        <div className="flex flex-col col-span-6"></div>
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">Os primeiros passos</h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col gap-6 col-span-6">
          <h2 className="text-h2 text-gray-950">
            Compromisso com a profundidade
          </h2>
          <p className="text-gray-800">
            O GELT teve seu início a partir de uma visão compartilhada entre um
            grupo entusiasmado de acadêmicos. Unidos pela paixão à literatura e
            pelo fascínio que as múltiplas línguas e culturas exercem sobre a
            palavra escrita, esse grupo visionário decidiu criar um espaço
            acadêmico dedicado a explorar tais interações complexas.
          </p>
        </div>
        <div className="flex flex-col gap-6 col-span-12">
          <div className="grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="flex flex-col col-span-12">
              <h2 className="text-h2 text-gray-950">Conheça nossa equipe</h2>
            </div>
            <div className="flex flex-col col-span-12">carrosel...</div>
            <div className="flex flex-col items-center col-span-12">
              <Link to="/team">
                Veja toda a equipe <MdArrowForward size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <NewsletterBanner />
        </div>
      </Container>
    </main>
  );
}
