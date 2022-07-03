import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { UseFormRegister } from "react-hook-form";
import { classNames } from "../../utils/string";

type TextAreaInputProps = {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  name,
  register,
  placeholder,
  defaultValue,
  error,
  label = name.toUpperCase(),
  optional = false,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {optional && (
          <span className="text-sm text-gray-500" id={`${name}-optional`}>
            Optional
          </span>
        )}
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="mt-1">
          <textarea
            rows={4}
            id={name}
            className={classNames(
              error
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "focus:border-lime-500 focust:ring-1 focus:ring-lime-500",
              "block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
            )}
            placeholder={placeholder}
            defaultValue={defaultValue}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${name}-error`}
            {...register(name)}
          />
        </div>
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextAreaInput;
