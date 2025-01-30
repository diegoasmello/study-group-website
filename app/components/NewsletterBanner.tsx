import { Button } from "./Button";
import { TextInput } from "./form-fields/TextInput";
import newsletterIllustration from "~/images/illustrations/newsletter.svg";

export function NewsletterBanner() {
  return (
    <div className="bg-primary-lighter py-10 px-16 rounded-[3.25rem] relative overflow-hidden">
      <div className="flex flex-col gap-6 items-start">
        <span className="text-h3 text-primary">
          Participe de
          <br />
          nosso grupo!
        </span>
        <TextInput name="a" type="email" placeholder="Digite seu e-mail" />
        <Button skin="outline">Enviar</Button>
      </div>
      <img
        src={newsletterIllustration}
        alt=""
        className="h-[545px] max-w-max absolute top-[-75px] right-[-102px]"
      />
    </div>
  );
}
