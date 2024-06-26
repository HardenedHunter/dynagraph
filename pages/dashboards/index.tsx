import { allSettled, fork, serialize } from "effector";

import { CustomNextPage } from "~/shared/misc";
import { dashboardsDrawerModel } from "~/modules/dashboards-drawer";
import { DashboardsLayout } from "~/layouts/dashboards-layout";
import { Dashboards } from "~/pages/dashboards";

const _Dashboards: CustomNextPage = Dashboards;

_Dashboards.layoutClassName = "";

_Dashboards.getLayout = (page) => <DashboardsLayout>{page}</DashboardsLayout>;

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(dashboardsDrawerModel.getDashboards, { scope });

  return { props: { values: serialize(scope) } };
};

export default _Dashboards;
