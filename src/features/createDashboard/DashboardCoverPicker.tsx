import { FC } from "react";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

import { Icon } from "~/shared/ui";
import { CreateDashboardData } from "~/shared/schemas";

export const DashboardCoverPicker: FC = () => {
  return (
    <section className="flex gap-8">
      <CoverPreview />
      <section className="flex flex-col gap-6">
        <ColorPicker />
        <IconPicker />
      </section>
    </section>
  );
};

const CoverPreview: FC = () => {
  const { watch } = useFormContext<CreateDashboardData>();

  const color = watch("color");
  const icon = watch("icon");

  return (
    <label>
      <p>Preview</p>
      <div
        className={`mt-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-neutral-50 ${color}`}
      >
        <Icon
          // @ts-expect-error Пусть ругается
          icon={icon}
          size="lg"
          className="drop-shadow-[0_0_5px_rgba(0,0,0,0.25)]"
        />
      </div>
    </label>
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
  "bg-violet-400",
  "bg-pink-400",
  "bg-neutral-400",
] as const;

const ColorPicker: FC = () => {
  const { control } = useFormContext<CreateDashboardData>();
  const { field } = useController({ name: "color", control });

  return (
    <label>
      <p>Color</p>
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
  const { control } = useFormContext<CreateDashboardData>();
  const { field } = useController({ name: "icon", control });

  return (
    <label>
      <p>Icon</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {icons.map((icon) => (
          <div
            key={icon}
            className={clsx(
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-neutral-600 text-neutral-50",
              field.value === icon &&
                "outline-none ring-2 ring-neutral-600 ring-offset-2",
            )}
            onClick={() => field.onChange(icon)}
          >
            <Icon icon={icon} size="lg" fixedWidth />
          </div>
        ))}
      </div>
    </label>
  );
};
