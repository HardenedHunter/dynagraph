import { allSettled, fork, serialize } from "effector";

import { CustomNextPage } from "~/shared/misc";
import {
  DashboardsDrawer,
  dashboardsDrawerModel,
} from "~/modules/dashboardsDrawer";

const Dashboards: CustomNextPage = () => {
  return (
    <div className="flex h-full">
      <DashboardsDrawer />
      <div className="p-6">456</div>
    </div>
  );
};

Dashboards.layoutClassName = "";

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(dashboardsDrawerModel.getDashboards, { scope });

  return { props: { values: serialize(scope) } };
};

export default Dashboards;
