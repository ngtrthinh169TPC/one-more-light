import type { InputHTMLAttributes, RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref?: RefObject<HTMLInputElement>;
}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  ref?: RefObject<HTMLTextAreaElement>;
}

interface SelectProps extends InputProps {
  options: string[];
}

// TODO: styling with consistency
// TODO: error handling

export function Input({ label, ref, ...props }: InputProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label}</span>
        <input
          ref={ref}
          className="rounded-md border-2 border-neutral-300 px-3 py-1 focus-visible:outline-light-1-primary"
          {...props}
          // aria-invalid={actionData?.errors?.title ? true : undefined}
          // aria-errormessage={
          //   actionData?.errors?.title ? "title-error" : undefined
          // }
        />
      </label>
    </div>
  );
}

export function TextArea({ label, ref, ...props }: TextAreaProps) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label}</span>
        <textarea
          ref={ref}
          rows={8}
          className="rounded-md border-2 border-neutral-300 px-3 py-1 focus-visible:outline-light-1-primary"
          {...props}
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

// FIXME: Review and refactor this the same way we did with Input & TextArea
export function Select({ label, options, ...props }: SelectProps) {
  return (
    <div>
      <label htmlFor={props.id} className="flex w-full flex-col gap-1">
        <span>{label}</span>
        <select
          name={props.name}
          className="rounded-md border-2 border-neutral-300 px-2 py-1 focus-visible:outline-light-1-primary"
        >
          {options.map((option) => (
            <option
              key={`select-option-${props.name}-${option}`}
              value={option}
            >
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
