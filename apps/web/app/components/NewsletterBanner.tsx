import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "./Button";
import { TextInput } from "./form-fields/TextInput";
import { useState } from "react";
import { IconSuccess } from "./icons/IconSuccess";
import { IconCancel } from "./icons/IconCancel";
import { twJoin } from "tailwind-merge";

export function NewsletterBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-primary-lighter py-10 px-6 lg:px-16 rounded-[3.25rem] relative overflow-hidden">
      <div className="flex flex-col gap-6 items-start">
        <span className="text-h3 text-primary">
          Participe de
          <br />
          nosso grupo!
        </span>
        <TextInput name="a" type="email" placeholder="Digite seu e-mail" />
        <Button skin="outline" onClick={() => setIsModalOpen((prev) => !prev)}>
          Enviar
        </Button>
      </div>
      <div className="hidden lg:block">
        <img
          src="/assets/illustrations/newsletter.svg"
          alt=""
          className="h-[545px] max-w-max absolute top-[-75px] right-[-102px]"
        />
      </div>
      <NewsletterFeedbackModal
        status="error"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function NewsletterFeedbackModal({
  open,
  status,
  onClose,
}: {
  open: boolean;
  status: "success" | "error";
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/20 z-30" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4 z-40">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="max-w-lg flex flex-col items-center gap-6 bg-white p-6 rounded-[2rem] shadow-custom-2 ">
            {status === "success" && (
              <IconSuccess className="size-20 text-success" />
            )}
            {status === "error" && (
              <IconCancel className="size-20 text-danger" />
            )}
            <div className="flex flex-col items-center gap-4">
              <DialogTitle
                className={twJoin(
                  "text-h4",
                  status === "success" ? "text-success" : "text-danger"
                )}
              >
                Só esperar!
              </DialogTitle>
              <p className="text-center text-gray-700 mx-[4rem]">
                Seu e-mail foi salvo, em breve você
                <br />
                reberá um e-mail com mais informações.
              </p>
            </div>
            <Button skin="ghost" size="md" onClick={onClose}>
              Fechar
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
