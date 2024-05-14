import { FC, useState } from "react";

import { Button, ModalWindow } from "~/shared/ui";
import { createModalActions } from "~/shared/misc";

const name = "ConfirmationModal";

type ConfirmationModalProps = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => Promise<void>;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    await onConfirm();

    setIsLoading(false);
  };

  return (
    <ModalWindow title={title}>
      {description}
      <section className="mt-6 flex gap-4">
        <Button block size="lg" onClick={handleConfirm} disabled={isLoading}>
          {confirmText}
        </Button>
        <Button
          block
          size="lg"
          variant="secondary"
          onClick={confirmationModal.close}
          disabled={isLoading}
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
