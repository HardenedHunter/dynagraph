import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGate } from "effector-react";
import { z } from "zod";

import { widgetNameSchema, widgetSourceSchema } from "~/server/contracts";
import { WidgetEditorData } from "../types";
import { editorModel } from "../model";
import { CodeSection } from "./code-section";
import { PreviewSection } from "./preview-section";

const defaultValues: WidgetEditorData = {
  name: "",
  source: "",
};

const schema = z.object({
  name: widgetNameSchema(),
  source: widgetSourceSchema(),
});

type WidgetEditorProps = {
  init?: WidgetEditorData;
  isLoading?: boolean;
  onSubmit: (data: WidgetEditorData) => void | Promise<void>;
  onExit: () => void;
};

export const WidgetEditor: FC<WidgetEditorProps> = ({
  init = defaultValues,
  isLoading,
  onSubmit,
  onExit,
}) => {
  useGate(editorModel.Gate);

  const form = useForm<WidgetEditorData>({
    defaultValues: init,
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid h-[calc(100vh-64px)] grid-cols-2 bg-neutral-100 p-0 pb-0">
          <CodeSection className="border-r-[1px] border-neutral-300" />
          <PreviewSection isLoading={isLoading} onExit={onExit} />
        </div>
      </form>
    </FormProvider>
  );
};
