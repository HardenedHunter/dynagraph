import { FC } from "react";

import { Icon, Panel } from "~/shared/ui";
import { createWidgetModal } from "./CreateWidgetModal";

export const CreateWidgetPanel: FC = () => {
  return (
    <Panel
      className="flex cursor-pointer flex-col items-center justify-center gap-2 hover:bg-neutral-100"
      onClick={createWidgetModal.push}
    >
      <Icon icon="plus" />
      <p>Create new widget</p>
    </Panel>
  );
};
