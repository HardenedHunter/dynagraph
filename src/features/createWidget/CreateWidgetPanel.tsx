import { FC } from "react";
import { Widget } from "@prisma/client";

import { Icon, Panel } from "~/shared/ui";
import { createWidgetModal } from "./CreateWidgetModal";

type CreateWidgetPanelProps = {
  onCreate?: (widget: Widget) => void;
};

export const CreateWidgetPanel: FC<CreateWidgetPanelProps> = ({ onCreate }) => {
  const handleClick = () => {
    createWidgetModal.push({ onCreate });
  };

  return (
    <Panel
      className="flex cursor-pointer flex-col items-center justify-center gap-2 hover:bg-neutral-100"
      onClick={handleClick}
    >
      <Icon icon="plus" />
      <p>Create new widget</p>
    </Panel>
  );
};
