import { FC } from "react";
import clsx from "clsx";

import { Panel, Icon, Button } from "~/shared/ui";
import {
  Datasource,
  DatasourceState,
  DatasourceStatus,
  isNotStarted,
  isPending,
  isUpdating,
} from "../lib";

type DatasourceListItemProps = {
  state: DatasourceState;
  onRemove: (entity: Datasource) => void;
  onRefresh: (entity: Datasource) => void;
};

const colorByStatus: Record<DatasourceStatus, string> = {
  NOT_STARTED: "text-neutral-400",
  PENDING: "text-blue-400",
  LOADED: "text-lime-400",
  FAILED: "text-red-400",
  UPDATING: "text-yellow-400",
  UPDATE_FAILED: "text-red-400",
};

export const DatasourceListItem: FC<DatasourceListItemProps> = ({
  state,
  onRemove,
  onRefresh,
}) => {
  const { entity, status } = state;

  const circleColor = colorByStatus[status];
  const isRefreshing = isPending(state) || isUpdating(state);
  const isRefreshDisabled = isRefreshing || isNotStarted(state);

  return (
    <Panel className="grid grid-cols-[14px_150px_1fr_24px_24px] items-center gap-4 !bg-neutral-100">
      <Icon icon="circle" size="sm" className={circleColor} />
      <p
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        title={entity.name}
      >
        {entity.name}
      </p>
      <p
        className="overflow-hidden text-ellipsis whitespace-nowrap underline"
        title={entity.url}
      >
        {entity.url}
      </p>
      <Button.Icon
        icon="refresh"
        disabled={isRefreshDisabled}
        iconProps={{
          size: "sm",
          className: clsx(
            isRefreshing && "animate-spin",
            isRefreshDisabled && "opacity-50",
          ),
        }}
        onClick={() => onRefresh(entity)}
        tabIndex={-1}
      />
      <Button.Icon
        icon="trash"
        iconProps={{ size: "sm" }}
        onClick={() => onRemove(entity)}
        tabIndex={-1}
      />
    </Panel>
  );
};
