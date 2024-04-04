import { FC } from "react";

import { Button } from "~/shared/ui";
import { addWidgetToDashboardModal } from "./AddWidgetToDashboardModal";

type AddWidgetToDashboardButtonProps = {
  dashboardId: string;
  onAdd?: () => void;
};

export const AddWidgetToDashboardButton: FC<
  AddWidgetToDashboardButtonProps
> = ({ dashboardId, onAdd }) => {
  const handleClick = () => {
    addWidgetToDashboardModal.push({ dashboardId, onAdd });
  };

  return <Button onClick={handleClick}>Add widget</Button>;
};
