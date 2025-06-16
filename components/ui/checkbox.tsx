"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ClassValue } from "clsx";

type Props = React.ComponentProps<typeof CheckboxPrimitive.Root>;

function Checkbox({ className, ...props }: Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

interface WithLabelProps extends Props {
  label?: string;
  wrapperClassName?: string;
}

function WithLabel({ label, wrapperClassName, ...props }: WithLabelProps) {
  const defaultId = `${new Date().getTime()}_checkbox`;
  return (
    <div className={cn("flex items-center gap-2", wrapperClassName)}>
      <Checkbox suppressHydrationWarning id={defaultId} {...props} />
      <Label suppressHydrationWarning htmlFor={props.id || defaultId}>
        {label}
      </Label>
    </div>
  );
}

export interface CheckboxDataItem {
  value: string;
  label: string;
  props?: WithLabelProps;
}

interface GroupProps {
  label?: string;
  items?: CheckboxDataItem[];
  horizontalLabel?: boolean;
  horizontalItems?: boolean;
  className?: ClassValue;
  classNames?: {
    base?: ClassValue;
    label?: ClassValue;
    itemsWrapper?: ClassValue;
  };
}

function Group(props: GroupProps) {
  const { label, horizontalLabel, horizontalItems, className, classNames, items = [] } = props;

  const baseClassName = cn(
    "flex flex-col items-start gap-3",
    { "flex-col sm:flex-row": horizontalLabel },
    classNames?.base,
    className
  );

  const labelClassName = cn("", { "w-40 max-w-40": horizontalLabel }, classNames?.label);

  return (
    <div className={baseClassName}>
      <Label className={labelClassName}>{label}</Label>

      <div className={cn("flex flex-col gap-2", { "sm:flex-row sm:gap-5": horizontalItems })}>
        {items.map((item, index) => (
          <WithLabel key={index} label={item.label} value={item.value} {...item.props} />
        ))}
      </div>
    </div>
  );
}

Checkbox.WithLabel = WithLabel;
Checkbox.Group = Group;

export { Checkbox };
