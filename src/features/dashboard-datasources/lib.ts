import { RouterOutputs } from "~/shared/api";

export type Datasource =
  RouterOutputs["dashboardDatasource"]["getDatasourcesByDashboardId"][number];

export type DSNotStarted = {
  entity: Datasource;
  status: "NOT_STARTED";
  data: null;
};

export type DSPending = {
  entity: Datasource;
  status: "PENDING";
  data: null;
};

export type DSFailed = {
  entity: Datasource;
  status: "FAILED";
  data: null;
};

export type DSLoaded = {
  entity: Datasource;
  status: "LOADED";
  data: { result: unknown };
};

export type DSUpdating = {
  entity: Datasource;
  status: "UPDATING";
  data: { result: unknown };
};

export type DSUpdateFailed = {
  entity: Datasource;
  status: "UPDATE_FAILED";
  data: { result: unknown };
};

export type DatasourceState =
  | DSNotStarted
  | DSPending
  | DSFailed
  | DSLoaded
  | DSUpdating
  | DSUpdateFailed;

export type DatasourceStatus = DatasourceState["status"];

export type DSEligibleForLoad =
  | DSNotStarted
  | DSFailed
  | DSLoaded
  | DSUpdateFailed;

export type DSLoading = DSPending | DSUpdating;

export type DSLoadFinished = DSLoaded | DSFailed | DSUpdateFailed;

export const isNotStarted = (state: DatasourceState): state is DSNotStarted =>
  state.status === "NOT_STARTED";

export const isPending = (state: DatasourceState): state is DSPending =>
  state.status === "PENDING";

export const isFailed = (state: DatasourceState): state is DSFailed =>
  state.status === "FAILED";

export const isLoaded = (state: DatasourceState): state is DSLoaded =>
  state.status === "LOADED";

export const isUpdating = (state: DatasourceState): state is DSUpdating =>
  state.status === "UPDATING";

export const isUpdateFailed = (
  state: DatasourceState,
): state is DSUpdateFailed => state.status === "UPDATE_FAILED";

export const isEligibleForLoad = (
  state: DatasourceState,
): state is DSEligibleForLoad =>
  isNotStarted(state) ||
  isFailed(state) ||
  isLoaded(state) ||
  isUpdateFailed(state);

export const isLoading = (state: DatasourceState): state is DSLoading =>
  isPending(state) || isUpdating(state);

export const getLoadingState = (state: DSEligibleForLoad): DSLoading => {
  if (isNotStarted(state) || isFailed(state)) {
    return { ...state, status: "PENDING" };
  }

  return { ...state, status: "UPDATING" };
};

export const getPostLoadingState = (
  state: DSLoading,
  data: null | { result: unknown },
): DSLoadFinished => {
  if (isPending(state)) {
    if (data) return { ...state, status: "LOADED", data };

    return { ...state, status: "FAILED" };
  }

  if (data) return { ...state, status: "LOADED", data };

  return { ...state, status: "UPDATE_FAILED" };
};
