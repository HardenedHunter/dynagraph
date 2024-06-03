import React from "react";

import { useDatasource } from "~/features/dashboardDatasources";
import { DashboardWidget } from "../model";
import { Widget } from "~/entities/widget";

type ConnectedWidgetProps = {
  widget: DashboardWidget;
};

export const ConnectedWidget = React.memo<ConnectedWidgetProps>(
  ({ widget }) => {
    const { raw, serialized } = widget;

    const datasource = useDatasource(raw.datasourceId);

    const isLoading =
      datasource !== null &&
      (datasource.status === "PENDING" || datasource.status === "NOT_STARTED");

    return (
      <Widget
        serialized={serialized}
        data={datasource?.data?.result}
        isLoading={isLoading}
      />
    );
  },
);

ConnectedWidget.displayName = "ConnectedWidget";
