import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  DocumentAddIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import React, { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PriceInput from "./form/PriceInput";
import SearchInput from "./form/SearchInput";
import TextAreaInput from "./form/TextAreaInput";
import TextInput from "./form/TextInput";
import {
  CreateReUpInputType,
  createReUpValidator,
} from "../shared/create-reup-validator";
import { trpc } from "../utils/trpc";
import Spinner from "./Spinner";
import AddProductForm from "./AddProductForm";
import { SelectOption } from "../shared/interfaces/SelectOption";

class FormData {
  date: string = "";
  title: string = "";
  from?: string;
  total?: number;
  products: SelectOption<number>[] = [];
  thoughts: string = "";
}

const formToApi = (data: FormData) => {
  const reUp: CreateReUpInputType = {
    date: new Date(data.date),
    title: data.title,
    from: data.from,
    total: data.total,
    thoughts: data.thoughts,
    products: data.products,
  };
  return reUp;
};

type AddReUpFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddReUpForm: React.FC<AddReUpFormProps> = ({ open, setOpen }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: new FormData(),
    resolver: zodResolver(createReUpValidator),
  });
  const utils = trpc.useContext();
  const [productOptions, setProductOptions] = useState<SelectOption<number>[]>(
    []
  );
  const [addProductOpen, setAddProductOpen] = useState(false);

  const { mutate, isLoading } = trpc.useMutation("reups.create", {
    onSuccess: (_) => {
      utils.invalidateQueries("reups.list");
      setOpen(false);
      reset(new FormData());
    },
  });

  const { isLoading: productsLoading } = trpc.useQuery(["products.list"], {
    onSuccess(data) {
      setProductOptions(
        data.map((product) => ({
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
                <div className="sm:flex sm:items-start">
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
                      Add New ReUp
                    </Dialog.Title>
                    <div className="py-3 pr-4 grid grid-cols-6 gap-4">
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <TextInput
                          name="date"
                          placeholder={new Date().toISOString().split("T")[0]}
                          label="Date"
                          register={register}
                          error={errors.date?.message}
                          iconStart={
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                          }
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <TextInput
                          name="title"
                          placeholder="Custom Title..."
                          label="Title"
                          register={register}
                          error={errors.title?.message}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <TextInput
                          name="from"
                          placeholder="Purchased From..."
                          label="From"
                          register={register}
                          error={errors.from?.message}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <PriceInput
                          name="total"
                          placeholder="Total Spent..."
                          label="Total Spent"
                          register={register}
                          error={errors.total?.message}
                        />
                      </div>
                      <div className="col-span-6">
                        <AddProductForm
                          open={addProductOpen}
                          setOpen={setAddProductOpen}
                        />
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
                            optional
                            disabled={productsLoading}
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
                      </div>
                      <div className="col-span-6">
                        <TextAreaInput
                          name="thoughts"
                          placeholder="Your initial thoughts on this ReUp"
                          label="Thoughts"
                          register={register}
                          error={errors.thoughts?.message}
                          optional
                        />
                      </div>
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
  );
};

export default AddReUpForm;
