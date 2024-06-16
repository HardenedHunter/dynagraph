import React, { FC } from "react";

import { Widget } from "~/entities/widget";
import { useDatasource } from "~/features/dashboard-datasources";
import { DashboardWidget } from "../model";

type ConnectedWidgetProps = {
  widget: DashboardWidget;
};

export const ConnectedWidget = React.memo<ConnectedWidgetProps>(
  ({ widget }) => {
    const {
      raw: { datasourceId },
      serialized,
    } = widget;

    if (datasourceId === null) {
      return <WidgetWithoutDatasource serialized={serialized} />;
    }

    return (
      <WidgetWithDatasource
        serialized={serialized}
        datasourceId={datasourceId}
      />
    );
  },
);

type WidgetWithDatasourceProps = {
  serialized: DashboardWidget["serialized"];
  datasourceId: string;
};

const WidgetWithDatasource: FC<WidgetWithDatasourceProps> = ({
  serialized,
  datasourceId,
}) => {
  const datasource = useDatasource(datasourceId);

  const isLoading =
    datasource.status === "PENDING" || datasource.status === "NOT_STARTED";

  return (
    <Widget
      serialized={serialized}
      data={datasource?.data?.result}
      isLoading={isLoading}
    />
  );
};

type WidgetWithoutDatasourceProps = {
  serialized: DashboardWidget["serialized"];
};

const WidgetWithoutDatasource: FC<WidgetWithoutDatasourceProps> = ({
  serialized,
}) => {
  return <Widget serialized={serialized} />;
};

ConnectedWidget.displayName = "ConnectedWidget";
