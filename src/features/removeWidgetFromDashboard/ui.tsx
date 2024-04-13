import { FC } from "react";

import { api } from "~/shared/api";
import { Button, ModalWindow } from "~/shared/ui";
import { createModalActions } from "~/shared/misc";

const name = "RemoveWidgetFromDashboardModal";

type RemoveWidgetFromDashboardModalProps = {
  dashboardWidgetId: string;
  onRemove?: () => void;
};

const RemoveWidgetFromDashboardModal: FC<
  RemoveWidgetFromDashboardModalProps
> = ({ dashboardWidgetId, onRemove }) => {
  const mutation = api.dashboardWidget.removeWidgetFromDashboard.useMutation({
    onSuccess: () => {
      removeWidgetFromDashboardModal.close();
      onRemove?.();
    },
  });

  const handleRemove = () => {
    mutation.mutate(dashboardWidgetId);
  };

  return (
    <ModalWindow modalName={name} title="Remove this widget?">
      Are you sure you want to remove this widget?
      <section className="mt-6 flex gap-4">
        <Button block size="lg" onClick={handleRemove}>
          Yes
        </Button>
        <Button
          block
          size="lg"
          variant="secondary"
          onClick={removeWidgetFromDashboardModal.close}
        >
          No
        </Button>
      </section>
    </ModalWindow>
  );
};

export const removeWidgetFromDashboardModal = createModalActions({
  name,
  Component: RemoveWidgetFromDashboardModal,
});
