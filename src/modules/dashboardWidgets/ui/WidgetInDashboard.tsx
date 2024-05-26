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
      title: "Убрать этот виджет с панели?",
      description: "Вы уверены, что хотите убрать этот виджет?",
      onConfirm: async () => {
        await mutation.mutateAsync(widget.id);
      },
      confirmProps: { variant: "error" },
    });
  };

  const menuOptions = [
    {
      name: "Убрать",
      icon: "trash",
      onClick: handleRemove,
    } as const,
  ];

  return (
    <Panel
      {...rest}
      className={clsx("relative pt-10", rest.className)}
      ref={null}
    >
      <p className="absolute left-4 top-2 text-xs font-bold">
        {widget.displayedName}
      </p>
      <WidgetBody widget={widget} />
      <Menu className="absolute right-0 top-0" options={menuOptions}>
        <div className="pr-2 pt-1">
          <Icon icon="ellipsis-vertical" />
        </div>
      </Menu>
    </Panel>
  );
};
