import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { Button, Input, ModalWindow } from "~/shared/ui";
import { DashboardCover } from "~/entities/dashboardCover";
import {
  CreateDashboardContract,
  createDashboardSchema,
} from "~/server/contracts";
import { DashboardCoverPicker } from "./DashboardCoverPicker";

const defaultValues: CreateDashboardContract = {
  name: "",
  color: "bg-red-400",
  icon: "chart-column",
};

const name = "CreateDashboardModal";

type CreateDashboardModalProps = {
  onCreate?: () => void;
};

const CreateDashboardModal: FC<CreateDashboardModalProps> = ({ onCreate }) => {
  const form = useForm<CreateDashboardContract>({
    defaultValues,
    resolver: zodResolver(createDashboardSchema),
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const mutation = api.dashboard.createDashboard.useMutation({
    onSuccess: () => {
      createDashboardModal.close();
      onCreate?.();
    },
  });

  const onSubmit = (data: CreateDashboardContract) => {
    mutation.mutate(data);
  };

  const color = watch("color");
  const icon = watch("icon");

  return (
    <ModalWindow title="Create new dashboard">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <section className="flex gap-6">
            <DashboardCover
              className="mt-6"
              backgroundColor={color}
              icon={icon}
            />
            <Input
              block
              label="Name"
              error={errors.name?.message}
              {...register("name")}
            />
          </section>
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
