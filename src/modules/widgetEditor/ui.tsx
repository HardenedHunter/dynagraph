import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, CodeEditor, Icon, Input, Panel } from "~/shared/ui";
import { CreateWidgetContract, createWidgetSchema } from "~/server/contracts";
import {
  SerializedWidget,
  serializeRawWidget,
  Widget,
} from "~/entities/widget";

const defaultValues: CreateWidgetContract = {
  name: "",
  source: "",
};

type WidgetEditorProps = {
  isLoading?: boolean;
  onSubmit: (data: CreateWidgetContract) => void | Promise<void>;
  onExit: () => void;
};

export const WidgetEditor: FC<WidgetEditorProps> = ({
  isLoading,
  onSubmit,
  onExit,
}) => {
  const [serialized, setSerialized] = useState<SerializedWidget | null>(null);

  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateWidgetContract>({
    defaultValues,
    resolver: zodResolver(createWidgetSchema),
  });

  const handleExecute = async () => {
    setSerialized(await serializeRawWidget(getValues().source));
  };

  const isExitDisabled = isLoading;
  const isSaveDisabled = !isDirty || isLoading;

  const exitText = isDirty ? "Отменить и выйти" : "Выйти";
  const exitVariant = isDirty ? "error" : "warning";

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid h-[calc(100vh-64px)] grid-cols-2 bg-neutral-100 p-0 pb-0">
        <section className="flex min-h-0 flex-col border-r-[1px] border-neutral-300 p-4 pb-0">
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2"
              variant="secondary"
              onClick={handleExecute}
            >
              <Icon icon="play" />
              Выполнить
            </Button>
          </div>
          <div className="flex-grow">
            <Controller
              control={control}
              name="source"
              render={({ field }) => (
                <CodeEditor
                  value={field.value}
                  onChange={field.onChange}
                  label="Исходный код"
                />
              )}
            />
          </div>
        </section>
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
              <Panel className="mt-1 aspect-[21/9]">
                {serialized && <Widget serialized={serialized} />}
              </Panel>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};
