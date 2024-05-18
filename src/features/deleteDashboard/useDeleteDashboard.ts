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
      title: "Delete this widget?",
      description: "Are you sure you want to delete this dashboard?",
      onConfirm: async () => {
        await mutation.mutateAsync(dashboardId);
      },
      confirmProps: { variant: "error" },
    });
  };
};
