import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon } from "@heroicons/react/outline";
import { Fragment } from "react";

type AddUpdateFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reUp: number;
};

const AddUpdateForm: React.FC<AddUpdateFormProps> = ({
  open,
  setOpen,
  reUp,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-9 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:flex-items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <DocumentAddIcon
                      className="h-10 w-10 text-lime-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mx-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 pt-2 font-medium text-gray-900"
                    >
                      Add Update to ReUp #{reUp}
                    </Dialog.Title>
                    <div className="py-3 pr-4 grid grid-cols-6 gap-4">
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        Form here
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddUpdateForm;
