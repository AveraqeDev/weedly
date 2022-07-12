import { Dialog, Transition } from "@headlessui/react";
import {
  DocumentAddIcon,
  MinusCircleIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { SelectOption } from "../shared/interfaces/SelectOption";
import { z } from "zod";
import { productValidator } from "../shared/product-validator";
import { ReUp } from "../shared/interfaces/ReUp";
import SearchInput from "./form/SearchInput";
import Spinner from "./Spinner";
import AddProductForm from "./AddProductForm";

class FormData {
  products: SelectOption<number>[] = [];
}

type AddProductToReUpFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reUp: ReUp;
};

const AddProductToReUpForm: React.FC<AddProductToReUpFormProps> = ({
  open,
  setOpen,
  reUp,
}) => {
  const formToApi = useCallback(
    (data: FormData) => {
      return {
        id: reUp.id,
        products: data.products,
      };
    },
    [reUp.id]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: new FormData(),
    resolver: zodResolver(z.object({ products: productValidator.min(1) })),
  });
  const utils = trpc.useContext();
  const [productOptions, setProductOptions] = useState<SelectOption<number>[]>(
    []
  );
  const [addProductOpen, setAddProductOpen] = useState(false);

  const { mutate, isLoading } = trpc.useMutation("reups.add-products", {
    onSuccess(_) {
      utils.invalidateQueries("reups.list");
      setOpen(false);
      reset(new FormData());
    },
  });

  const { isLoading: productsLoading } = trpc.useQuery(["products.list"], {
    onSuccess(data) {
      const existingProductIds = reUp.products.map(
        (product) => product.product.id
      );
      setProductOptions(
        data
          .filter((product) => !existingProductIds.includes(product.id))
          .map((product) => ({
            value: product.id,
            label: product.name,
            extra: product.brand,
          }))
      );
    },
  });

  const cancelButtonRef = useRef(null);

  const save: SubmitHandler<FormData> = async (data: FormData) => {
    mutate(formToApi(data));
  };

  const cancel = () => {
    setOpen(false);
    reset(new FormData());
  };

  return (
    <>
      <AddProductForm open={addProductOpen} setOpen={setAddProductOpen} />
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
                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
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
                        Add Product to {reUp.title}
                      </Dialog.Title>
                      <div className="py-3 pr-4">
                        <div className="flex flex-col items-end md:flex-row">
                          <SearchInput<FormData>
                            name="products"
                            label="Products"
                            options={productOptions}
                            defaultValue={[]}
                            placeholder="Products Purchased..."
                            multiple
                            control={control}
                            error={errors.products?.message}
                            disabled={
                              productsLoading ||
                              (!productsLoading && productOptions.length <= 0)
                            }
                          />
                          <button
                            disabled={productsLoading}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm mt-2 px-4 py-2 bg-lime-400 text-base font-medium text-gray-600 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 disabled:hover:cursor-not-allowed disabled:hover:bg-lime-400"
                            onClick={() => setAddProductOpen(true)}
                          >
                            <PlusIcon className="h-5 w-5" />
                          </button>
                        </div>
                        {productsLoading && (
                          <div className="flex items-center justify-center">
                            <div>
                              <Spinner size={5} />
                            </div>
                            <span className="text-xs text-gray-400">
                              Getting products...
                            </span>
                          </div>
                        )}
                        {!productsLoading && productOptions.length <= 0 && (
                          <div className="flex items-center justify-center pt-2 gap-2">
                            <div>
                              <MinusCircleIcon className="h-5 w-5 text-red-500" />
                            </div>
                            <span className="text-xs text-gray-400">
                              No available products to add
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={isLoading}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lime-400 text-base font-medium text-gray-600 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 disabled:hover:cursor-not-allowed disabled:hover:bg-lime-400"
                      onClick={handleSubmit(save)}
                    >
                      {isLoading ? "Loading..." : "Add"}
                    </button>
                    <button
                      disabled={isLoading}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-75 disabled:hover:cursor-not-allowed disabled:hover:bg-white"
                      onClick={cancel}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddProductToReUpForm;
