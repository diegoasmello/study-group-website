import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "./Button";
import { TextInput } from "./form-fields/TextInput";
import { useEffect, useState } from "react";
import { IconSuccess } from "./icons/IconSuccess";
import { IconCancel } from "./icons/IconCancel";
import { twJoin } from "tailwind-merge";
import { useFetcher } from "@remix-run/react";

type NewsletterStatus = "success" | "error";

export function NewsletterBanner() {
  const fetcher = useFetcher<{
    success?: boolean;
    error?: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<NewsletterStatus>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    const emailInput = document.getElementById("email");
    if (fetcher.data?.success) {
      setStatus("success");
      setIsModalOpen(true);
      if (emailInput instanceof HTMLInputElement) {
        emailInput.value = "";
      }
    } else if (fetcher.data?.error) {
      setStatus("error");
      setErrorMessage(fetcher.data?.error);
      setIsModalOpen(true);
    }
  }, [fetcher]);

  return (
    <div className="bg-primary-lighter py-10 px-6 lg:px-16 rounded-[3.25rem] relative overflow-hidden grid grid-cols-12">
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 items-start">
        <span className="text-h3 text-primary">
          Join our
          <br />
          group!
        </span>
        <fetcher.Form
          method="post"
          action="/api/subscribe"
          className="w-full flex flex-col gap-6 items-start"
        >
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="bg-white"
          />
          <Button
            skin="outline"
            size="md"
            onClick={() => setIsModalOpen((prev) => !prev)}
            disabled={fetcher.state === "submitting"}
          >
            Submit
          </Button>
        </fetcher.Form>
      </div>
      <div className="hidden lg:block">
        <img
          src="/assets/illustrations/newsletter.svg"
          alt=""
          className="h-[545px] max-w-max absolute top-[-75px] right-[-102px]"
        />
      </div>
      {isModalOpen && status && (
        <NewsletterFeedbackModal
          status={status}
          open={isModalOpen}
          errorMessage={errorMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

const modalContent: Record<
  NewsletterStatus,
  { title: string; description: string }
> = {
  success: {
    title: "Só esperar!",
    description:
      "Seu e-mail foi salvo, em breve você reberá um e-mail com mais informações.",
  },
  error: {
    title: "Ops, algo deu errado.",
    description: "Seu e-mail não pôde ser salvo, tente novamente mais tarde.",
  },
};

function NewsletterFeedbackModal({
  open,
  status,
  errorMessage,
  onClose,
}: {
  open: boolean;
  status: NewsletterStatus;
  errorMessage: string | undefined;
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
                  status === "success" ? "text-success" : "text-danger",
                )}
              >
                {modalContent[status].title}
              </DialogTitle>
              <p className="text-center text-gray-700 mx-[4rem]">
                {errorMessage ?? modalContent[status].description}
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
