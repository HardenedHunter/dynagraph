import { allSettled, fork, serialize } from "effector";
import { GetServerSideProps } from "next";

import { CustomNextPage } from "~/shared/misc";
import { dashboardsDrawerModel } from "~/modules/dashboards-drawer";
import { dashboardWidgetsModel } from "~/modules/dashboard-widgets";
import { DashboardsLayout } from "~/layouts/dashboards-layout";
import { Dashboard, dashboardModel } from "~/pages/dashboard";
import { dashboardDatasourcesModel } from "~/features/dashboard-datasources";

const _Dashboard: CustomNextPage = Dashboard;

_Dashboard.layoutClassName = "";

_Dashboard.getLayout = (page) => <DashboardsLayout>{page}</DashboardsLayout>;

export const getServerSideProps: GetServerSideProps<
  object,
  { id: string }
> = async (ctx) => {
  const id = ctx.params?.id;

  if (!id) {
    return { notFound: true };
  }

  const scope = fork();

  await Promise.all([
    allSettled(dashboardsDrawerModel.getDashboards, { scope }),
    allSettled(dashboardModel.getDashboard, { scope, params: id }),
    allSettled(dashboardWidgetsModel.getWidgets, { scope, params: id }),
    allSettled(dashboardDatasourcesModel.getDatasources, { scope, params: id }),
  ]);

  return { props: { values: serialize(scope) } };
};

export default _Dashboard;
