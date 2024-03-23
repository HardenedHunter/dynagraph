import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Widget } from "@prisma/client";

import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { Button, Input, ModalWindow, TextArea } from "~/shared/ui";
import { CreateWidgetData, createWidgetSchema } from "~/shared/schemas";

const defaultValues: CreateWidgetData = {
  name: "",
  source: "",
};

const name = "CreateWidgetModal";

type CreateWidgetModalProps = {
  onCreate?: (widget: Widget) => void;
};

const CreateWidgetModal: FC<CreateWidgetModalProps> = ({ onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWidgetData>({
    defaultValues,
    resolver: zodResolver(createWidgetSchema),
  });

  const mutation = api.widget.createWidget.useMutation({
    onSuccess: (widget) => {
      createWidgetModal.close();
      onCreate?.(widget);
    },
  });

  const onSubmit = (data: CreateWidgetData) => {
    mutation.mutate(data);
  };

  return (
    <ModalWindow modalName={name} title="Create new widget">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          block
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextArea
          block
          label="Source"
          error={errors.source?.message}
          {...register("source")}
        />
        <Button block type="submit" size="lg" disabled={mutation.isLoading}>
          Create
        </Button>
      </form>
    </ModalWindow>
  );
};

export const createWidgetModal = createModalActions({
  name,
  Component: CreateWidgetModal,
});
