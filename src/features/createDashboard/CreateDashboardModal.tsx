import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dashboard } from "@prisma/client";

import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { Button, Input, ModalWindow } from "~/shared/ui";
import { CreateDashboardData, createDashboardSchema } from "~/shared/schemas";
import { DashboardCoverPicker } from "./DashboardCoverPicker";

const defaultValues: CreateDashboardData = {
  name: "",
  color: "bg-red-400",
  icon: "chart-column",
};

const name = "CreateDashboardModal";

type CreateDashboardModalProps = {
  onCreate?: (dashboard: Dashboard) => void;
};

const CreateDashboardModal: FC<CreateDashboardModalProps> = ({ onCreate }) => {
  const form = useForm<CreateDashboardData>({
    defaultValues,
    resolver: zodResolver(createDashboardSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const mutation = api.dashboard.createDashboard.useMutation({
    onSuccess: (widget) => {
      createDashboardModal.close();
      onCreate?.(widget);
    },
  });

  const onSubmit = (data: CreateDashboardData) => {
    mutation.mutate(data);
  };

  return (
    <ModalWindow modalName={name} title="Create new dashboard">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <Input
            block
            label="Name"
            error={errors.name?.message}
            {...register("name")}
          />
          <DashboardCoverPicker />
          <Button
            className="mt-4"
            block
            type="submit"
            size="lg"
            disabled={mutation.isLoading}
          >
            Create
          </Button>
        </FormProvider>
      </form>
    </ModalWindow>
  );
};

export const createDashboardModal = createModalActions({
  name,
  Component: CreateDashboardModal,
});
