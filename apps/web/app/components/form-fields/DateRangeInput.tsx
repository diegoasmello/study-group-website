import { useTranslation } from "react-i18next";
import { useLocale } from "~/lib/useLocale";
import { FormControl, FormControlProps } from "./FormControl";
import { TextInput } from "./TextInput";

interface DateRangeInputProps
  extends Omit<FormControlProps, "children">,
    Omit<React.ComponentProps<"input">, "type" | "defaultValue"> {
  defaultValue?: DateRange;
}

export type DateRange = {
  startDate?: string;
  endDate?: string;
};

export function DateRangeInput(props: DateRangeInputProps) {
  const { label, defaultValue } = props;

  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <FormControl label={label}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-8">
        <TextInput
          name="startDate"
          type="date"
          lang={locale}
          defaultValue={defaultValue?.startDate}
        />
        <span className="text-gray-950 font-medium">
          {t("DateRangeInput.to")}
        </span>
        <TextInput
          name="endDate"
          type="date"
          lang={locale}
          defaultValue={defaultValue?.endDate}
        />
      </div>
    </FormControl>
  );
}
