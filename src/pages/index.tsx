import { allSettled, fork, serialize } from "effector";

import { WidgetGrid, widgetModel } from "~/modules/widget-grid";

const Home = () => {
  return <WidgetGrid />;
};

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(widgetModel.getWidgets, { scope });

  return { props: { values: serialize(scope) } };
};

export default Home;
