import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment, MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

import { Icon, IconProps } from "~/shared/ui";
import { Panel } from "./Panel";

type MenuOption = {
  name: string;
  icon?: IconProps["icon"];
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type MenuProps = {
  options: MenuOption[];
  children: ReactNode;
};

export const Menu: FCC<MenuProps> = ({ children, className, options }) => {
  return (
    <div className={className}>
      <HeadlessMenu as="div" className="relative inline-block">
        <HeadlessMenu.Button className={"rounded outline-none"}>
          {children}
        </HeadlessMenu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items
            as={Panel}
            className="absolute right-0 mt-2 w-32 origin-top-right !p-1 shadow-xl outline-none"
          >
            {options.map((option) => (
              <HeadlessMenu.Item key={option.name}>
                {({ active }) => (
                  <button
                    className={clsx(
                      "flex w-full items-center gap-2 rounded px-2 py-2 text-sm",
                      active
                        ? "bg-violet-500 [&_p]:text-neutral-50 [&_path]:fill-neutral-50"
                        : "[&_p]:text-neutral-600 [&_path]:fill-neutral-600",
                    )}
                    onClick={option.onClick}
                  >
                    {option.icon && <Icon icon={option.icon} size="xs" />}
                    <p className="text-sm">{option.name}</p>
                  </button>
                )}
              </HeadlessMenu.Item>
            ))}
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  );
};
