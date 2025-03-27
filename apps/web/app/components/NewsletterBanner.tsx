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
import { twMerge } from "tailwind-merge";
import { useFetcher } from "@remix-run/react";
import { useTranslation } from "react-i18next";

type NewsletterStatus = "success" | "error";

export function NewsletterBanner({ className }: { className?: string }) {
  const fetcher = useFetcher<{
    success?: boolean;
    error?: string;
  }>();

  const { t } = useTranslation();
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
    <div
      className={twMerge(
        "bg-primary-lighter py-10 px-6 lg:px-16 rounded-3xl lg:rounded-[3.25rem] relative overflow-hidden grid grid-cols-12",
        className,
      )}
    >
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 items-start">
        <span className="text-h3 text-primary">
          {t("NewsletterBanner.title")}
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
            placeholder={t("NewsletterBanner.emailInputPlaceholder")}
            required
            className="bg-white"
          />
          <Button
            skin="outline"
            size="md"
            onClick={() => setIsModalOpen((prev) => !prev)}
            disabled={fetcher.state === "submitting"}
          >
            {t("NewsletterBanner.submitButtonLabel")}
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
  const { t } = useTranslation();

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
              {status === "success" && (
                <DialogTitle className="text-h4 text-success">
                  {t("NewsletterBanner.feedback.success.title")}
                </DialogTitle>
              )}
              {status === "error" && (
                <DialogTitle className="text-h4 text-danger">
                  {t("NewsletterBanner.feedback.error.title")}
                </DialogTitle>
              )}
              <p className="text-center text-gray-700 mx-[4rem]">
                {status === "success" &&
                  t("NewsletterBanner.feedback.success.description")}
                {status === "error" &&
                  (errorMessage ??
                    t("NewsletterBanner.feedback.error.description"))}
              </p>
            </div>
            <Button skin="ghost" size="md" onClick={onClose}>
              {t("NewsletterBanner.feedback.closeButtonLabel")}
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
