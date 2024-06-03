import { useRouter } from "next/router";

import { api, RouterOutputs } from "~/shared/api";
import { CustomNextPage, useRouterLoading } from "~/shared/misc";
import { WidgetEditor, type WidgetEditorData } from "~/modules/widgetEditor";

export type EditWidgetProps = {
  widget: RouterOutputs["widget"]["getWidgetById"];
};

export const EditWidget: CustomNextPage<EditWidgetProps> = ({ widget }) => {
  const router = useRouter();

  const isRouterLoading = useRouterLoading();

  const mutation = api.widget.editWidget.useMutation({
    onSuccess: () => {
      // TODO
    },
  });

  const handleSubmit = (data: WidgetEditorData) => {
    mutation.mutate({ id: widget.id, ...data });
  };

  const handleExit = () => {
    router.push("/library");
  };

  const isLoading = mutation.isLoading || isRouterLoading;

  return (
    <WidgetEditor
      init={widget}
      onExit={handleExit}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

EditWidget.layoutClassName = "";
