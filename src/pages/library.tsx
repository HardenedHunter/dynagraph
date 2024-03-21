import { allSettled, fork, serialize } from "effector";

import { WidgetLibrary, widgetLibraryModel } from "~/modules/widgetLibrary";

const Library = () => <WidgetLibrary />;

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(widgetLibraryModel.getWidgets, { scope });

  return { props: { values: serialize(scope) } };
};

export default Library;
