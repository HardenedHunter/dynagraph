import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

import { Button } from "~/shared/ui";

type WidgetLoadingErrorProps = {
  error: string;
};

export const WidgetLoadingError: FCC<WidgetLoadingErrorProps> = ({ error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-red-500">Failed to load widget</p>
      <Button variant="secondary" onClick={openModal}>
        View stack trace
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Failed to load widget
                  </Dialog.Title>
                  <div className="my-6 overflow-x-auto">
                    <pre>
                      <p className="text-sm text-red-500">{error}</p>
                    </pre>
                  </div>

                  <div className="mt-4 text-center">
                    <Button variant="primary" size="lg" onClick={closeModal}>
                      Close
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
