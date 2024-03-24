import { FC } from "react";

import { createModalActions } from "~/shared/misc";
import { ModalWindow } from "~/shared/ui";

const name = "AddWidgetToDashboardModal";

type AddWidgetToDashboardModalProps = {
  dashboardId: string;
  onAdd?: () => void;
};

const AddWidgetToDashboardModal: FC<AddWidgetToDashboardModalProps> = ({
  dashboardId,
  onAdd,
}) => {
  return (
    <ModalWindow modalName={name} title="Add widget to dashboard">
      123
    </ModalWindow>
  );
};

export const addWidgetToDashboardModal = createModalActions({
  name,
  Component: AddWidgetToDashboardModal,
});
