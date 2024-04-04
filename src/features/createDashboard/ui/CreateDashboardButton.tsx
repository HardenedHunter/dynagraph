import { FC } from "react";

import { Button, Icon } from "~/shared/ui";
import { createDashboardModal } from "./CreateDashboardModal";

type CreateDashboardButtonProps = {
  onCreate?: () => void;
};

export const CreateDashboardButton: FC<CreateDashboardButtonProps> = ({
  onCreate,
}) => {
  const handleClick = () => {
    createDashboardModal.push({ onCreate });
  };

  return (
    <Button className="h-12 w-12 rounded-full !p-0" onClick={handleClick}>
      <Icon icon="plus" size="2xl" />
    </Button>
  );
};
