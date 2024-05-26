import { api } from "~/shared/api";
import { confirmationModal } from "~/shared/ui";

export const useDeleteDashboard = (onDelete?: () => void) => {
  const mutation = api.dashboard.deleteDashboard.useMutation({
    onSuccess: () => {
      confirmationModal.close();
      onDelete?.();
    },
  });

  return (dashboardId: string) => {
    confirmationModal.open({
      title: "Удалить эту панель?",
      description: "Вы уверены, что хотите удалить эту панель?",
      onConfirm: async () => {
        await mutation.mutateAsync(dashboardId);
      },
      confirmProps: { variant: "error" },
    });
  };
};
