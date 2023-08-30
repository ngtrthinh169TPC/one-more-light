import { camelCase } from "lodash";

type InputProps = {
  name: string;
  error?: string | null;
};

interface SelectProps extends InputProps {
  options: string[];
}

// TODO: styling with consistency

export function Input({ name, error }: InputProps) {
  console.log(camelCase(name));

  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{camelCase(name)}: </span>
        <input
          // ref={titleRef}
          name={name}
          className="flex-1 rounded-md border-2 border-neutral-300 px-3 text-lg leading-loose"
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

export function TextArea({ name, error }: InputProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{camelCase(name)}: </span>
        <textarea
          // ref={titleRef}
          name={name}
          rows={8}
          className="flex-1 rounded-md border-2 border-neutral-300 px-3 text-lg leading-loose"
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
      <label className="flex w-full appearance-none flex-col gap-1">
        <span>{camelCase(name)}: </span>
        <select name={name}>
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