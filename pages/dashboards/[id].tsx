import { allSettled, fork, serialize } from "effector";

import { CustomNextPage } from "~/shared/misc";
import { dashboardsDrawerModel } from "~/modules/dashboardsDrawer";
import { Button } from "~/shared/ui";
import { DashboardsLayout } from "~/layouts/dashboardsLayout";

const Dashboard: CustomNextPage = () => {
  return (
    <div className="p-4">
      <Button variant="primary">123</Button>
    </div>
  );
};

Dashboard.layoutClassName = "";

Dashboard.getLayout = (page) => <DashboardsLayout>{page}</DashboardsLayout>;

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(dashboardsDrawerModel.getDashboards, { scope });

  return { props: { values: serialize(scope) } };
};

export default Dashboard;
