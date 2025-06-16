"use client";

import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "./input";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { requiredErrorMessage } from "@/lib/constants";

const InputNumberBase = forwardRef<HTMLInputElement, NumericFormatProps<InputProps>>(
  (props, ref) => {
    return <NumericFormat thousandSeparator customInput={Input} getInputRef={ref} {...props} />;
  }
);

InputNumberBase.displayName = "InputNumber";

interface WithControlProps<T extends FieldValues>
  extends NumericFormatProps<Omit<InputProps, "name">> {
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
      render={({ field: { value, onChange, ...field }, fieldState }) => {
        const isArray = Array.isArray(value);

        return (
          <InputNumber
            {...field}
            value={isArray ? value.join("") : value || ""}
            onValueChange={(values) => onChange(values.floatValue)}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...rest}
          />
        );
      }}
    />
  );
}

const InputNumber = Object.assign(InputNumberBase, { WithRHFControl: WithControl });

export default InputNumber;
