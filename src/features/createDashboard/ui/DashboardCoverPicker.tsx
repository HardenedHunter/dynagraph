import { FC } from "react";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

import { Icon } from "~/shared/ui";
import { CreateDashboardContract } from "~/server/contracts";

export const DashboardCoverPicker: FC = () => {
  return (
    <section className="flex flex-col gap-6">
      <ColorPicker />
      <IconPicker />
    </section>
  );
};

const colors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-cyan-400",
  "bg-blue-400",
  "bg-pink-400",
  "bg-neutral-400",
] as const;

const ColorPicker: FC = () => {
  const { control } = useFormContext<CreateDashboardContract>();
  const { field } = useController({ name: "color", control });

  return (
    <label>
      <p>Цвет</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {colors.map((color) => (
          <div
            key={color}
            className={clsx(
              `h-8 w-8 cursor-pointer rounded-full ${color}`,
              field.value === color &&
                "outline-none ring-2 ring-neutral-600 ring-offset-2",
            )}
            onClick={() => field.onChange(color)}
          />
        ))}
      </div>
    </label>
  );
};

const icons = [
  "chart-column",
  "chart-line",
  "chart-pie",
  "globe",
  "microchip",
  "circle-nodes",
  "network-wired",
] as const;

const IconPicker: FC = () => {
  const { control } = useFormContext<CreateDashboardContract>();
  const { field } = useController({ name: "icon", control });

  return (
    <label>
      <p>Иконка</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {icons.map((icon) => (
          <div
            key={icon}
            className={clsx(
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-600 text-neutral-50",
              field.value === icon &&
                "outline-none ring-2 ring-neutral-600 ring-offset-2",
            )}
            onClick={() => field.onChange(icon)}
          >
            <Icon icon={icon} size="1x" fixedWidth />
          </div>
        ))}
      </div>
    </label>
  );
};
