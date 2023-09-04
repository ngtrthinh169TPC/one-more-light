import { capitalize } from "lodash";

type InputProps = {
  name: string;
  defaultValue?: string;
  error?: string | null;
};

interface SelectProps extends InputProps {
  options: string[];
}

// TODO: styling with consistency

export function Input({ name, defaultValue, error }: InputProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{capitalize(name)}: </span>
        <input
          // ref={titleRef}
          name={name}
          defaultValue={defaultValue}
          className="rounded-md border-2 border-neutral-300 px-3 py-1 focus-visible:outline-light-1-primary"
          // aria-invalid={actionData?.errors?.title ? true : undefined}
          // aria-errormessage={
          //   actionData?.errors?.title ? "title-error" : undefined
          // }
        />
      </label>
      {error ? (
        <div className="pt-1 text-red-700" id="title-error">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export function TextArea({ name, defaultValue, error }: InputProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{capitalize(name)}: </span>
        <textarea
          // ref={titleRef}
          name={name}
          defaultValue={defaultValue}
          rows={8}
          className="rounded-md border-2 border-neutral-300 px-3 py-1 focus-visible:outline-light-1-primary"
          // aria-invalid={actionData?.errors?.title ? true : undefined}
          // aria-errormessage={
          //   actionData?.errors?.title ? "title-error" : undefined
          // }
        />
      </label>
      {/* {actionData?.errors?.title ? (
  <div className="pt-1 text-red-700" id="title-error">
    {actionData.errors.title}
  </div>
) : null} */}
    </div>
  );
}

export function Select({ name, error, options }: SelectProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{capitalize(name)}: </span>
        <select
          name={name}
          className="rounded-md border-2 border-neutral-300 px-2 py-1 focus-visible:outline-light-1-primary"
        >
          {options.map((option) => (
            <option key={`select-option-${name}-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {/* {actionData?.errors?.title ? (
  <div className="pt-1 text-red-700" id="title-error">
    {actionData.errors.title}
  </div>
) : null} */}
    </div>
  );
}
