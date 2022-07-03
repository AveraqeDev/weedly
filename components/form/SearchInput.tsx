import { Combobox } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationCircleIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { classNames } from "../../utils/string";

type OptionValue = string | number;

type Option = {
  value: OptionValue;
  label: string;
  extra?: string;
};

type SearchInputProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  optional?: boolean;
  multiple?: boolean;
  error?: string;
};

function SearchInput<T>(props: SearchInputProps & UseControllerProps<T>) {
  const {
    name,
    label,
    options,
    placeholder,
    error,
    optional = false,
    multiple = false,
  } = props;
  const [query, setQuery] = useState("");
  const {
    field: { value, onChange },
  } = useController(props);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={value} onChange={onChange} multiple={multiple}>
      <div className="flex justify-between">
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
        {optional && (
          <span className="text-sm text-gray-500" id={`${name}-optional`}>
            Optional
          </span>
        )}
      </div>
      <div className="relative mt-1">
        <Combobox.Input
          name={name}
          id={name}
          className={classNames(
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "focus:border-lime-500 focust:ring-1 focus:ring-lime-500",
            "w-full rounded-md bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
          )}
          onChange={(event) => setQuery(event?.target.value)}
          displayValue={(option: Option | Option[]) => {
            if (typeof option === "undefined") {
              return "";
            }
            if (Array.isArray(option)) {
              return option.map((opt) => opt.label).join(", ");
            }
            return option.label;
          }}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${name}-error`}
        />
        <Combobox.Button
          className={classNames(
            error ? "right-6" : "right-0",
            "absolute inset-y-0 flex items-center rounded-r-md px-2 focus:outline-none"
          )}
        >
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-lime-400 text-gray-600" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "block truncate",
                          selected ? "font-semibold" : ""
                        )}
                      >
                        {option.label}
                      </span>
                      {option.extra && (
                        <span className="ml-2 truncate text-gray-500">
                          {option.extra}
                        </span>
                      )}
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-lime-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </Combobox>
  );
}

export default SearchInput;
