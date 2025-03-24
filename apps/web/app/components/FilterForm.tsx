import { Form } from "@remix-run/react";
import { flags } from "~/flags";
import { Button } from "./Button";
import { CheckboxInput } from "./form-fields/CheckboxInput";
import { DateRange, DateRangeInput } from "./form-fields/DateRangeInput";
import { FormControl } from "./form-fields/FormControl";
import { TextInput } from "./form-fields/TextInput";
import { IconSearch } from "./icons";
import { RemixFormProps } from "@remix-run/react/dist/components";
import { ComboboxInput, ComboboxItem } from "./form-fields/ComboboxInput";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

interface FilterFormProps extends RemixFormProps {
  researchAreas: { id: string; title: string }[];
  researchers: { id: string; name: string }[];
  isFiltering?: boolean;
  defaultValues?: {
    query?: string;
    researchAreas?: string[];
    researcher?: ComboboxItem;
  } & DateRange;
}

export function FilterForm(props: FilterFormProps) {
  const {
    className,
    researchAreas,
    researchers,
    isFiltering,
    defaultValues,
    ...formProps
  } = props;

  const { t } = useTranslation();

  const researchersInputItems = [
    { label: t("FilterForm.allLabel"), value: "" },
    ...(researchers?.map((researcher) => ({
      label: researcher.name,
      value: researcher.id.toString(),
    })) ?? []),
  ];

  return (
    <Form
      className={twMerge("flex flex-col items-start gap-5", className)}
      {...formProps}
    >
      <TextInput
        id="q"
        name="q"
        placeholder={t("FilterForm.textInputPlaceholder")}
        Icon={IconSearch}
        className="w-full"
        defaultValue={defaultValues?.query}
      />
      {!!researchAreas?.length && (
        <FormControl label={t("FilterForm.researchAreasTitle")}>
          <div className="flex flex-col gap-2">
            {researchAreas.map((researchArea) => (
              <CheckboxInput
                name="researchAreas[]"
                key={researchArea.id}
                label={researchArea.title}
                value={researchArea.id}
                defaultChecked={defaultValues?.researchAreas?.includes(
                  researchArea.id,
                )}
              />
            ))}
          </div>
        </FormControl>
      )}
      {!!researchers?.length && (
        <ComboboxInput
          name="researcher"
          label={t("FilterForm.researcherTitle")}
          immediate
          items={researchersInputItems}
          defaultValue={defaultValues?.researcher ?? researchersInputItems[0]}
        />
      )}
      <DateRangeInput
        label={t("FilterForm.periodTitle")}
        defaultValue={{
          startDate: defaultValues?.startDate,
          endDate: defaultValues?.endDate,
        }}
      />
      <nav className="flex gap-2">
        <Button size="md">{t("FilterForm.searchButtonLabel")}</Button>
        {flags.CLEAR_FILTERS_ENABLED && isFiltering && (
          <Button size="md" skin="ghost" type="button">
            {t("FilterForm.clearFilterButtonLabel")}
          </Button>
        )}
      </nav>
    </Form>
  );
}

export function parseSearchParams(searchParams: URLSearchParams) {
  const researcher: ComboboxItem = JSON.parse(
    decodeURIComponent(searchParams.get("researcher")!),
  );
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const researchAreas = searchParams.getAll("researchAreas[]");

  return {
    query: searchParams.get("q") ?? undefined,
    researchAreas: researchAreas.length ? researchAreas : undefined,
    researcher: researcher,
    startDate: startDate,
    endDate: endDate,
  };
}
