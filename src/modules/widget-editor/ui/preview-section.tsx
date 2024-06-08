import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { Button, Input } from "~/shared/ui";
import { WidgetEditorData } from "../types";
import { WidgetPreview } from "./widget-preview";

type PreviewSectionProps = {
  isLoading?: boolean;
  onExit: () => void;
};

export const PreviewSection: FC<PreviewSectionProps> = ({
  isLoading,
  onExit,
}) => {
  const {
    register,
    formState: { isDirty, errors },
  } = useFormContext<WidgetEditorData>();

  const isExitDisabled = isLoading;
  const isSaveDisabled = !isDirty || isLoading;

  const exitText = isDirty ? "Отменить и выйти" : "Выйти";
  const exitVariant = isDirty ? "error" : "secondary";

  return (
    <section className="flex flex-col p-4">
      <div className="flex justify-end gap-2">
        <Button
          variant={exitVariant}
          fillVariant="border"
          onClick={onExit}
          disabled={isExitDisabled}
        >
          {exitText}
        </Button>
        <Button type="submit" disabled={isSaveDisabled}>
          Сохранить
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          block
          label="Название"
          error={errors.name?.message}
          {...register("name")}
        />
        <div>
          <p>Предпросмотр</p>
          <WidgetPreview className="mt-1" />
        </div>
      </div>
    </section>
  );
};
