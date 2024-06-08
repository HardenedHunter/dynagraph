import { useRouter } from "next/router";

import { api } from "~/shared/api";
import { CustomNextPage, useRouterLoading } from "~/shared/misc";
import { WidgetEditor, type WidgetEditorData } from "~/modules/widget-editor";

export const CreateWidget: CustomNextPage = () => {
  const router = useRouter();

  const isRouterLoading = useRouterLoading();

  const mutation = api.widget.createWidget.useMutation({
    onSuccess: () => {
      router.push("/library");
    },
  });

  const handleSubmit = (data: WidgetEditorData) => {
    mutation.mutate(data);
  };

  const handleExit = () => {
    router.push("/library");
  };

  const isLoading = mutation.isLoading || isRouterLoading;

  return (
    <WidgetEditor
      onExit={handleExit}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

CreateWidget.layoutClassName = "";
