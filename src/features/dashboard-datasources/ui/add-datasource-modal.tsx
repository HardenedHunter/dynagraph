import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, ModalWindow } from "~/shared/ui";
import { createModalActions } from "~/shared/misc";
import {
  datasourceNameSchema,
  datasourceUrlSchema,
} from "~/server/contracts/createDashboardDatasource";
import { api } from "~/shared/api";

const name = "AddDatasourceModal";

const schema = z.object({
  name: datasourceNameSchema,
  url: datasourceUrlSchema,
});

type FormData = z.infer<typeof schema>;

type AddDatasourceModalProps = {
  dashboardId: string;
  onAdd?: () => void;
};

const AddDatasourceModal: FC<AddDatasourceModalProps> = ({
  dashboardId,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = api.dashboardDatasource.addDatasourceToDashboard.useMutation(
    {
      onSuccess: async () => {
        await addDatasourceModal.close();
        onAdd?.();
      },
    },
  );

  const onSubmit = ({ name, url }: FormData) => {
    mutation.mutate({ dashboardId, name, url });
  };

  return (
    <ModalWindow title="Добавить источник данных">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          block
          label="Название"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          block
          label="URL"
          error={errors.url?.message}
          {...register("url")}
        />
        <Button
          className="mt-4"
          block
          type="submit"
          size="lg"
          disabled={mutation.isLoading}
        >
          Добавить
        </Button>
      </form>
    </ModalWindow>
  );
};

export const addDatasourceModal = createModalActions({
  name,
  Component: AddDatasourceModal,
});
