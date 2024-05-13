import { FC } from "react";

import { createModalActions } from "~/shared/misc";
import { Button, ModalWindow } from "~/shared/ui";

const name = "WidgetLoadingErrorModal";

type WidgetLoadingErrorModalProps = {
  error: string;
};

export const WidgetLoadingErrorModal: FC<WidgetLoadingErrorModalProps> = ({
  error,
}) => {
  return (
    <ModalWindow title="Failed to load widget">
      <pre>
        <p className="text-sm text-red-500">{error}</p>
      </pre>
      <Button
        className="mt-6"
        block
        size="lg"
        onClick={widgetLoadingErrorModal.close}
      >
        Close
      </Button>
    </ModalWindow>
  );
};

export const widgetLoadingErrorModal = createModalActions({
  name,
  Component: WidgetLoadingErrorModal,
});
