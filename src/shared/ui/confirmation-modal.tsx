import { FC, useState } from "react";

import { Button, ButtonProps, ModalWindow } from "~/shared/ui";
import { createModalActions } from "~/shared/misc";

const name = "ConfirmationModal";

type ConfirmationModalProps = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  description,
  confirmText = "Да",
  cancelText = "Нет",
  confirmProps,
  cancelProps,
  onConfirm,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    await onConfirm();

    setIsLoading(false);
  };

  const handleCancel = async () => {
    await confirmationModal.close();
    onCancel?.();
  };

  return (
    <ModalWindow title={title}>
      {description}
      <section className="mt-6 flex gap-4">
        <Button
          block
          size="lg"
          onClick={handleConfirm}
          disabled={isLoading}
          {...confirmProps}
        >
          {confirmText}
        </Button>
        <Button
          block
          size="lg"
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
          {...cancelProps}
        >
          {cancelText}
        </Button>
      </section>
    </ModalWindow>
  );
};

export const confirmationModal = createModalActions({
  name,
  Component: ConfirmationModal,
});
