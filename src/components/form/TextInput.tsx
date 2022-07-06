import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { UseFormRegister } from "react-hook-form";
import { classNames } from "../../utils/string";

type TextInputProps = {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  optional?: boolean;
  addon?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  name,
  register,
  placeholder,
  defaultValue,
  error,
  addon,
  iconStart,
  iconEnd,
  label = name.toUpperCase(),
  optional = false,
}) => {
  return (
    <>
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
        {iconStart && (
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            {iconStart}
          </div>
        )}
        {addon && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {addon}
          </span>
        )}
        <input
          type="text"
          id={name}
          className={classNames(
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "focus:border-lime-500 focust:ring-1 focus:ring-lime-500",
            iconStart ? "pl-7" : "",
            "block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
          )}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${name}-error`}
          {...register(name)}
        />
        {iconEnd && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {iconEnd}
          </div>
        )}
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
    </>
  );
};

export default TextInput;
