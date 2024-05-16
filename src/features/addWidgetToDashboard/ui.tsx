import { FC } from "react";
import { useGate, useUnit } from "effector-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { BlockLoader, Button, Input, ModalWindow, Select } from "~/shared/ui";
import { model } from "./model";

const name = "AddWidgetToDashboardModal";

const schema = z.object({
  displayedName: z.string().min(1),
  widget: z.object({
    id: z.string(),
    name: z.string(),
    source: z.string(),
  }),
  datasource: z
    .object({
      id: z.string(),
      name: z.string(),
      dashboardId: z.string(),
      url: z.string(),
    })
    .optional(),
});

type FormData = z.infer<typeof schema>;

type AddWidgetToDashboardModalProps = {
  dashboardId: string;
  onAdd?: () => void;
};

const AddWidgetToDashboardModal: FC<AddWidgetToDashboardModalProps> = ({
  dashboardId,
  onAdd,
}) => {
  const {
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [widgets, datasources, isLoading] = useUnit([
    model.$widgets,
    model.$datasources,
    model.$pending,
  ]);

  useGate(model.Gate, dashboardId);

  const mutation = api.dashboardWidget.addWidgetToDashboard.useMutation({
    onSuccess: () => {
      addWidgetToDashboardModal.close();
      onAdd?.();
    },
  });

  const onSubmit = (data: FormData) => {
    const { widget, datasource, displayedName } = data;

    mutation.mutate({
      widgetId: widget.id,
      datasourceId: datasource?.id,
      dashboardId,
      displayedName,
    });
  };

  return (
    <ModalWindow title="Add widget to dashboard">
      {isLoading && <BlockLoader className="!h-[288px]" />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            block
            label="Displayed name"
            error={errors.displayedName?.message}
            {...register("displayedName")}
          />
          <Controller
            control={control}
            name="widget"
            render={({ field }) => {
              return (
                <Select
                  block
                  className="mt-2"
                  label="Widget"
                  error={errors.widget?.message}
                  options={widgets}
                  value={field.value}
                  onChange={(value) => {
                    if (!getValues().displayedName) {
                      setValue("displayedName", value.name);
                    }

                    field.onChange(value);
                    field.onBlur();
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="datasource"
            render={({ field }) => {
              return (
                <Select
                  block
                  className="mt-2"
                  label="Datasource"
                  error={errors.datasource?.message}
                  options={datasources}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                />
              );
            }}
          />
          <Button
            className="mt-4"
            block
            type="submit"
            size="lg"
            disabled={mutation.isLoading}
          >
            Add
          </Button>
        </form>
      )}
    </ModalWindow>
  );
};

export const addWidgetToDashboardModal = createModalActions({
  name,
  Component: AddWidgetToDashboardModal,
});
