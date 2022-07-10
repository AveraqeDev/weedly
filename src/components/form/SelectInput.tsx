import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationCircleIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { classNames } from "../../utils/string";

type OptionValue = string | number;

type Option = {
  value: OptionValue;
  label: string;
  extra?: string;
};

type SelectInputProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  optional?: boolean;
  error?: string;
  disabled?: boolean;
};

function SelectInput<T>(props: SelectInputProps & UseControllerProps<T>) {
  const {
    name,
    label,
    options,
    placeholder,
    error,
    optional = false,
    disabled = false,
  } = props;
  const {
    field: { value, onChange },
  } = useController(props);

  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full"
    >
      <div className="flex justify-between">
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Listbox.Label>
        {optional && (
          <span className="text-sm text-gray-500" id={`${name}-optional`}>
            Optional
          </span>
        )}
      </div>
      <div className="relative mt-1">
        <Listbox.Button
          name={name}
          id={name}
          className={classNames(
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "focus:border-lime-500 focus:ring-1 focus:ring-lime-500",
            "w-full rounded-md border border-gray-500 bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm disabled:hover:cursor-progress disabled:bg-gray-200"
          )}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${name}-error`}
        >
          <span
            className={classNames(
              (value as Option).label ? "text-gray-900" : "text-gray-500",
              "block truncate text-left"
            )}
          >
            {(value as Option).label ?? placeholder}
          </span>
          <span
            className={classNames(
              error ? "right-6" : "right-0",
              "absolute inset-y-0 flex items-center rounded-r-md px-2 focus:outline-none"
            )}
          >
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}

        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-lime-400 text-gray-600" : "text-gray-900"
                  )
                }
              >
                {({ active }) => {
                  const selected = option.value === (value as Option).value;
                  return (
                    <>
                      <div className="flex justify-between">
                        <span
                          className={classNames(
                            "block truncate",
                            selected ? "font-semibold" : ""
                          )}
                        >
                          {option.label}
                        </span>
                        {option.extra && (
                          <span className="mx-2 truncate text-gray-500">
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
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </Listbox>
  );
}

export default SelectInput;
