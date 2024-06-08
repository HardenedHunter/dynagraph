import { useUnit } from "effector-react";

import { api } from "~/shared/api";
import { confirmationModal, Icon, Menu, PanelProps } from "~/shared/ui";
import { ConnectedWidget } from "./connected-widget";
import { DashboardWidget, model } from "../model";
import { WidgetPanel } from "~/entities/widget";

type WidgetInDashboardProps = PanelProps & {
  widget: DashboardWidget;
  onRemove?: () => void;
};

export const WidgetInDashboard: FCC<WidgetInDashboardProps> = ({
  className,
  widget,
  onRemove,
}) => {
  const openFullscreen = useUnit(model.openFullscreen);

  const deleteMutation =
    api.dashboardWidget.removeWidgetFromDashboard.useMutation({
      onSuccess: () => {
        confirmationModal.close();
        onRemove?.();
      },
    });

  const handleExpand = () => {
    openFullscreen(widget);
  };

  const handleRemove = () => {
    confirmationModal.open({
      title: "Убрать этот виджет с панели?",
      description: "Вы уверены, что хотите убрать этот виджет?",
      onConfirm: async () => {
        await deleteMutation.mutateAsync(widget.raw.id);
      },
      confirmProps: { variant: "error" },
    });
  };

  const menuOptions = [
    {
      name: "Редактировать",
      icon: "edit",
      onClick: () => {
        //
      },
    } as const,
    {
      name: "Развернуть",
      icon: "expand-arrows-alt",
      onClick: handleExpand,
    } as const,
    {
      name: "Убрать",
      icon: "trash",
      onClick: handleRemove,
    } as const,
  ];

  return (
    <WidgetPanel className={className} name={widget.raw.displayedName}>
      <ConnectedWidget widget={widget} />
      <Menu className="absolute right-0 top-0" options={menuOptions}>
        <div className="pr-2 pt-1">
          <Icon icon="ellipsis-vertical" />
        </div>
      </Menu>
    </WidgetPanel>
  );
};
