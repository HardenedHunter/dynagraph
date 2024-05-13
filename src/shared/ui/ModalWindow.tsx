import { Fragment, ReactNode, MutableRefObject } from "react";
import { Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "~/shared/ui";
import { useUnit } from "effector-react";
import { modalModel } from "~/shared/model";

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  initialFocus?: MutableRefObject<HTMLElement | null>;
};

export const ModalWindow: FCC<ModalWindowProps> = ({
  className,
  title,
  children,
  initialFocus,
}) => {
  const [modal, close, remove] = useUnit([
    modalModel.$modal,
    modalModel.close,
    modalModel.remove,
  ]);

  const handleClose = () => {
    close();
  };

  return (
    <Transition
      appear
      show={!modal?.isClosing}
      as={Fragment}
      afterLeave={remove}
    >
      <Dialog
        initialFocus={initialFocus}
        as="div"
        className="relative z-10"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform rounded bg-neutral-50 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between gap-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>

                  <Button.Icon
                    tabIndex={-1}
                    icon="close"
                    onClick={handleClose}
                  />
                </div>

                <div className={clsx(className, "mt-6")}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
