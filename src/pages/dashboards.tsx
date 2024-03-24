import { allSettled, fork, serialize } from "effector";

import { CustomNextPage } from "~/shared/misc";
import { dashboardsDrawerModel } from "~/modules/dashboardsDrawer";
import { Button } from "~/shared/ui";
import { DashboardsLayout } from "~/layouts/dashboardsLayout";

const Dashboards: CustomNextPage = () => {
  return (
    <div className="p-4">
      <Button variant="primary">123</Button>
    </div>
  );
};

Dashboards.layoutClassName = "";

Dashboards.getLayout = (page) => <DashboardsLayout>{page}</DashboardsLayout>;

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(dashboardsDrawerModel.getDashboards, { scope });

  return { props: { values: serialize(scope) } };
};

export default Dashboards;
