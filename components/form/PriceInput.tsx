import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { UseFormRegister } from "react-hook-form";
import { classNames } from "../../utils/string";

type PriceInputProps = {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  currency?: string;
  optional?: boolean;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
};

const PriceInput: React.FC<PriceInputProps> = ({
  name,
  register,
  placeholder,
  defaultValue,
  error,
  label = name.toUpperCase(),
  currency = "USD",
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
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          id={name}
          className={classNames(
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "focust:ring-lime-500 focus:border-lime-500 ",
            "block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          )}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-describedby={`${name}-currency`}
          {...register(name)}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm" id={`${name}-currency`}>
              {currency}
            </span>
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

export default PriceInput;
