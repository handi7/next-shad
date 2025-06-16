import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ClassValue } from "clsx";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { requiredErrorMessage } from "@/lib/constants";

export type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  horizontalLabel?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  classNames?: {
    base?: ClassValue;
    label?: ClassValue;
    innerWrapper?: ClassValue;
    leftContentWrapper?: ClassValue;
    rightContentWrapper?: ClassValue;
    input?: ClassValue;
    errorMessage?: ClassValue;
  };
};

function Input(props: InputProps) {
  const {
    className,
    classNames,
    type,
    label,
    horizontalLabel,
    isRequired,
    isInvalid,
    errorMessage,
    leftContent,
    rightContent,
    ...rest
  } = props;

  const defaultId = `${new Date().getTime()}_input`;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2",
        { "sm:flex-row": horizontalLabel },
        classNames?.base,
        className
      )}
    >
      <Label
        suppressHydrationWarning
        htmlFor={props.id || defaultId}
        className={cn(
          "",
          { "text-destructive": isInvalid },
          { "sm:w-40 sm:min-w-40 sm:max-w-40 sm:my-2.5": horizontalLabel },
          { hidden: !label },
          classNames?.label
        )}
      >
        {label}
        <span className={cn("text-xs text-destructive font-semibold", { hidden: !isRequired })}>
          *
        </span>
      </Label>

      <div className={cn("w-full flex flex-col gap-1")}>
        <div
          className={cn(
            "flex gap-2 text-sm overflow-hidden",
            "border rounded-md transition-all",
            "focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
            { "border-destructive": isInvalid },
            classNames?.innerWrapper
          )}
        >
          <div
            className={cn(
              "flex justify-center items-center pl-2",
              { hidden: !leftContent },
              classNames?.leftContentWrapper
            )}
          >
            {leftContent}
          </div>

          <input
            suppressHydrationWarning
            id={defaultId}
            type={type}
            data-slot="input"
            aria-invalid={isInvalid}
            className={cn(
              "w-full bg-transparent outline-none text-sm py-2",
              "aria-invalid:text-destructive aria-invalid:placeholder:text-destructive/70",
              { "pl-2": !leftContent },
              { "pr-2": !rightContent },
              classNames?.input
            )}
            {...rest}
          />

          <div
            className={cn(
              "flex justify-center items-center pr-2",
              { hidden: !rightContent },
              classNames?.rightContentWrapper
            )}
          >
            {rightContent}
          </div>
        </div>

        <span
          className={cn(
            "text-xs text-destructive",
            { hidden: !isInvalid },
            classNames?.errorMessage
          )}
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
}

interface WithControlProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

function WithControl<T extends FieldValues>(props: WithControlProps<T>) {
  const { control, name, rules = {}, ...rest } = props;

  if (props.isRequired) rules.required = requiredErrorMessage;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          value={field.value ?? ""}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
}

Input.WithRHFControl = WithControl;

export { Input };
