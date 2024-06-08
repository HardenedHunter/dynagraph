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
    <ModalWindow title="Ошибка выполнения виджета">
      <div className="max-h-80 w-full overflow-scroll pb-3">
        <pre>
          <p className="text-sm text-red-500">{error}</p>
        </pre>
      </div>
      <Button
        className="mt-6"
        block
        size="lg"
        onClick={widgetLoadingErrorModal.close}
      >
        Закрыть
      </Button>
    </ModalWindow>
  );
};

export const widgetLoadingErrorModal = createModalActions({
  name,
  Component: WidgetLoadingErrorModal,
});
