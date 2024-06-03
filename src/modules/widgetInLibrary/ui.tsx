import { FC } from "react";
import { useRouter } from "next/router";

import { api } from "~/shared/api";
import { confirmationModal, Icon, Menu } from "~/shared/ui";
import { WidgetPanel } from "~/entities/widget";

type WidgetInLibraryProps = {
  id: string;
  name: string;
  onDelete?: () => void;
};

export const WidgetInLibrary: FC<WidgetInLibraryProps> = ({
  id,
  name,
  onDelete,
}) => {
  const router = useRouter();

  const mutation = api.widget.deleteWidget.useMutation({
    onSuccess: () => {
      confirmationModal.close();
      onDelete?.();
    },
  });

  const handleRemove = () => {
    confirmationModal.open({
      title: "Удалить этот виджет?",
      description:
        "Вы уверены, что хотите навсегда удалить этот виджет? Он также будет удален из всех панелей. Это действие необратимо.",
      onConfirm: async () => {
        await mutation.mutateAsync(id);
      },
      confirmProps: { variant: "error" },
    });
  };

  const menuOptions = [
    {
      name: "Редактировать",
      icon: "edit",
      onClick: () => router.push(`/library/edit?widget=${id}`),
    } as const,
    {
      name: "Убрать",
      icon: "trash",
      onClick: handleRemove,
    } as const,
  ];

  return (
    <WidgetPanel name={name}>
      <div className="flex h-24 items-center justify-center">
        <Icon icon="chart-column" size="3x" />
      </div>
      <Menu className="absolute right-0 top-0" options={menuOptions}>
        <div className="pr-2 pt-1">
          <Icon icon="ellipsis-vertical" />
        </div>
      </Menu>
    </WidgetPanel>
  );
};
