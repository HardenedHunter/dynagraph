import { Fragment, Key, useId } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Icon } from "~/shared/ui";

type SelectOption = { id: Key; name: string } | string;

type SelectProps<T> = {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  error?: string;
  label?: string;
  block?: boolean;
  className?: string;
  buttonClassName?: string;
};

const getOptionLabel = (item: SelectOption) =>
  typeof item === "string" ? item : item.name;

const isEqual = (selected: SelectOption | undefined, current: SelectOption) => {
  if (!selected) return false;

  if (typeof selected === "string" && typeof current === "string") {
    return selected === current;
  }

  if (typeof selected === "object" && typeof current === "object") {
    return selected.id === current.id;
  }
  console.log(selected, current);

  throw "unreachable";
};

export const Select = <T extends SelectOption = string>({
  options,
  value,
  onChange,
  error,
  block,
  label,
  className,
  buttonClassName,
}: SelectProps<T>) => {
  const id = useId();

  const buttonContent =
    value === undefined ? "-Select-" : getOptionLabel(value);

  return (
    <div className={className}>
      <label htmlFor={id}>{label && <p className="mb-1">{label}</p>}</label>
      <Listbox value={value} onChange={onChange} by={isEqual}>
        <div className="relative">
          <Listbox.Button
            id={id}
            className={clsx(
              buttonClassName,
              block && "w-full",
              "relative rounded border-[1px] border-neutral-300 bg-white py-2 pl-3 pr-10 text-left outline-none focus:ring-1",
              error
                ? "border-red-600 focus:border-red-600 focus:ring-red-600 focus-visible:border-red-600 focus-visible:ring-red-600"
                : "focus:border-violet-500 focus:ring-violet-500 focus-visible:border-violet-500 focus-visible:ring-violet-500",
            )}
          >
            <span className="block truncate">{buttonContent}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon icon="sort" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                block && "w-full",
                "absolute z-10 mt-1 max-h-60 overflow-auto rounded border-[1px] border-neutral-300 bg-white py-1 shadow-md outline-none",
              )}
            >
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-violet-100 text-violet-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-medium text-violet-900"
                            : "font-normal"
                        }`}
                      >
                        {getOptionLabel(option)}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                          <Icon icon="check" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
