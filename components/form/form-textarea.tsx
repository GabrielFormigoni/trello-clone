import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

type FormTextareaProps = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>;
  defaultValue?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      className,
      defaultValue,
      disabled,
      required,
      errors,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            disabled={pending || disabled}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            aria-describedby={`${id}-error`}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
          />
          <FormErrors errors={errors} id={id} />
        </div>
      </div>
    );
  }
);
