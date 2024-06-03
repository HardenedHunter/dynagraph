import { GetServerSideProps } from "next";

import { apiClient } from "~/shared/api";
import { EditWidget, EditWidgetProps } from "~/pages/editWidget";

export const getServerSideProps: GetServerSideProps<
  EditWidgetProps,
  { id: string }
> = async (ctx) => {
  const id = ctx.params?.id;

  if (!id) {
    return { notFound: true };
  }

  try {
    const widget = await apiClient.widget.getWidgetById.query(id);

    return { props: { widget } };
  } catch {
    return { notFound: true };
  }
};

export default EditWidget;
