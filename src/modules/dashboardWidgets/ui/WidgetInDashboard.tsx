import clsx from "clsx";

import { api } from "~/shared/api";
import { confirmationModal, Icon, Menu, Panel, PanelProps } from "~/shared/ui";
import { WidgetBody } from "./WidgetBody";
import { DashboardWidget } from "../model";

type WidgetInDashboardProps = PanelProps & {
  widget: DashboardWidget;
  onRemove?: () => void;
};

export const WidgetInDashboard: FCC<WidgetInDashboardProps> = ({
  widget,
  onRemove,
  ...rest
}) => {
  const mutation = api.dashboardWidget.removeWidgetFromDashboard.useMutation({
    onSuccess: () => {
      confirmationModal.close();
      onRemove?.();
    },
  });

  const handleRemove = () => {
    confirmationModal.open({
      title: "Remove this widget?",
      description: "Are you sure you want to remove this widget?",
      onConfirm: async () => {
        await mutation.mutateAsync(widget.id);
      },
    });
  };

  const menuOptions = [
    {
      name: "Remove",
      icon: "trash",
      onClick: handleRemove,
    } as const,
  ];

  return (
    <Panel {...rest} className={clsx("relative", rest.className)} ref={null}>
      <Menu className="absolute right-0 top-0" options={menuOptions}>
        <div className="pr-2 pt-1">
          <Icon icon="ellipsis-vertical" />
        </div>
      </Menu>
      <WidgetBody widget={widget} />
    </Panel>
  );
};
