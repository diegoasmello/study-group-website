import { Form } from "@remix-run/react";
import { flags } from "~/flags";
import { Button } from "./Button";
import { CheckboxInput } from "./form-fields/CheckboxInput";
import { DateRange, DateRangeInput } from "./form-fields/DateRangeInput";
import { FormControl } from "./form-fields/FormControl";
import { TextInput } from "./form-fields/TextInput";
import { IconSearch } from "./icons";
import { RemixFormProps } from "@remix-run/react/dist/components";
import { ComboboxInput } from "./form-fields/ComboboxInput";
import { twMerge } from "tailwind-merge";

interface FilterFormProps extends RemixFormProps {
  researchAreas: { id: string; title: string }[];
  researchers: { id: string; name: string }[];
  isFiltering?: boolean;
  defaultValues?: {
    q?: string;
    researchAreas?: { id: string; title: string };
    researchers?: { id: string; name: string };
    period?: DateRange;
  };
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

  const researchersInputItems = [
    { label: "Todos", value: "" },
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
        placeholder="Search by title or author"
        Icon={IconSearch}
        className="w-full"
        defaultValue={defaultValues?.q}
      />
      <FormControl label="Research areas">
        <div className="flex flex-col gap-2">
          {researchAreas?.map((researchArea) => (
            <CheckboxInput
              name="researchAreas[]"
              key={researchArea.id}
              label={researchArea.title}
              value={researchArea.id}
              //   defaultChecked={defaultValues?.researchAreas.id && researchAreas?.includes(
              //     defaultValues.researchAreas.id,
              //   )}
            />
          ))}
        </div>
      </FormControl>
      <ComboboxInput
        name="researcher"
        label="Author"
        immediate
        items={researchersInputItems}
        // defaultValue={parsedSearchParams.researcher ?? researchersInputItems[0]}
      />
      <DateRangeInput label="Period" defaultValue={defaultValues?.period} />
      <nav className="flex gap-2">
        <Button size="md">Search</Button>
        {flags.CLEAR_FILTERS_ENABLED && isFiltering && (
          <Button size="md" skin="ghost" type="button">
            Clear filters
          </Button>
        )}
      </nav>
    </Form>
  );
}
