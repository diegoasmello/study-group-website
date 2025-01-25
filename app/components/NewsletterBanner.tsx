import { Button } from "./Button";

export function NewsletterBanner() {
  return (
    <div className="bg-primary-lighter py-10 px-16 rounded-[3.25rem]">
      <div className="flex flex-col gap-6 items-start">
        <span className="text-h3 text-primary">
          Participe de
          <br />
          nosso grupo!
        </span>
        <input type="text" placeholder="Digite seu e-mail" />
        <Button skin="outline">Enviar</Button>
      </div>
    </div>
  );
}
