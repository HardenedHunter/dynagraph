import { allSettled, fork, serialize } from "effector";

import { MainLayout } from "~/shared/ui";
import { WidgetGrid, widgetModel } from "~/modules/widget-grid";

const Home = () => {
  return (
    <MainLayout>
      <WidgetGrid />
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(widgetModel.getWidgets, { scope });

  return { props: { values: serialize(scope) } };
};

export default Home;
