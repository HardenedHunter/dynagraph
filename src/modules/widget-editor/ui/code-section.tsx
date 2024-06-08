import { FC } from "react";
import { useUnit } from "effector-react";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import { Button, CodeEditor, Icon } from "~/shared/ui";
import { serializeRawWidget } from "~/entities/widget";
import { editorModel } from "../model";
import { WidgetEditorData } from "../types";

type CodeSectionProps = {
  className?: string;
};

export const CodeSection: FC<CodeSectionProps> = ({ className }) => {
  const setSerialized = useUnit(editorModel.setSerialized);

  const { control, getValues } = useFormContext<WidgetEditorData>();

  const handleExecute = async () => {
    setSerialized(await serializeRawWidget(getValues().source));
  };

  return (
    <section className={clsx("flex min-h-0 flex-col p-4 pb-0", className)}>
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
      <div className="min-h-0 flex-grow">
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
  );
};
