import { CustomNextPage } from "~/shared/misc";
import { CreateDashboardButton } from "~/features/createDashboard";

const Dashboards: CustomNextPage = () => {
  return (
    <div className="flex h-full">
      <div className="bg-neutral-50 p-3">
        <CreateDashboardButton />
      </div>
      <div className="p-6">456</div>
    </div>
  );
};

Dashboards.layoutClassName = "";

export default Dashboards;
