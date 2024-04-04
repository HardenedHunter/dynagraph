import { FC } from "react";
import { useGate, useUnit } from "effector-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { Button, Icon, ModalWindow, Select } from "~/shared/ui";
import { model } from "../model";

const name = "AddWidgetToDashboardModal";

const schema = z.object({
  widget: z.object({
    id: z.string(),
    name: z.string(),
    source: z.string(),
  }),
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [widgets, isLoading] = useUnit([model.$widgets, model.$pending]);

  useGate(model.Gate);

  const mutation = api.dashboardWidget.addWidgetToDashboard.useMutation({
    onSuccess: () => {
      addWidgetToDashboardModal.close();
      onAdd?.();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ widgetId: data.widget.id, dashboardId });
  };

  return (
    <ModalWindow modalName={name} title="Add widget to dashboard">
      {isLoading && (
        <div className="flex h-48 items-center justify-center">
          <Icon icon="spinner" className="animate-spin" />
        </div>
      )}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="widget"
            render={({ field }) => {
              return (
                <Select
                  block
                  label="Widget"
                  error={errors.widget?.message}
                  options={widgets}
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
