import { allSettled, fork, serialize } from "effector";

import { WidgetLibrary, widgetLibraryModel } from "~/pages/widgetLibrary";

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(widgetLibraryModel.getWidgets, { scope });

  return { props: { values: serialize(scope) } };
};

export default WidgetLibrary;
