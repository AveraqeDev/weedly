import { Dialog, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductTag } from "@prisma/client";
import { Fragment, useCallback, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SelectOption } from "../shared/interfaces/SelectOption";
import { trpc } from "../utils/trpc";
import SelectInput from "./form/SelectInput";
import TextAreaInput from "./form/TextAreaInput";

class FormData {
  rating: SelectOption<number> = { value: 0, label: "" };
  review: string = "";
}

type RateProductFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product & { tags: ProductTag[] };
};

const RateProductForm: React.FC<RateProductFormProps> = ({
  open,
  setOpen,
  product,
}) => {
  const formToApi = useCallback(
    (data: FormData) => {
      return {
        id: product.id,
        rating: data.rating.value,
        review: data.review,
      };
    },
    [product.id]
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: new FormData(),
    resolver: zodResolver(
      z.object({
        rating: z.number().min(1).max(5),
        review: z.string().min(5).max(1000),
      })
    ),
  });
  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.useMutation("products.rate", {
    onSuccess(_) {
      utils.invalidateQueries("products.user-ratings");
      setOpen(false);
      reset(new FormData());
    },
  });

  const cancelButtonRef = useRef(null);

  const save: SubmitHandler<FormData> = async (data) => {
    mutate(formToApi(data));
  };

  const cancel = () => {
    setOpen(false);
    reset(new FormData());
  };

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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
                <div className="sm:flex sm:flex-items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <StarIcon
                      className="h-10 w-10 text-lime-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mx-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 pt-2 font-medium text-gray-900"
                    >
                      Add Review to {product.name}{" "}
                      <span className="text-sm text-gray-400">
                        ({product.brand})
                      </span>
                    </Dialog.Title>
                    <div className="py-3 pr-4">
                      <div className="flex flex-col items-center gap-2">
                        <SelectInput<FormData>
                          name="rating"
                          placeholder="Your rating..."
                          label="Rating"
                          control={control}
                          error={errors.rating?.message}
                          options={[
                            {
                              value: 1,
                              label: "1",
                            },
                            {
                              value: 2,
                              label: "2",
                            },
                            {
                              value: 3,
                              label: "3",
                            },
                            {
                              value: 4,
                              label: "4",
                            },
                            {
                              value: 5,
                              label: "5",
                            },
                          ]}
                        />
                        <TextAreaInput
                          name="review"
                          placeholder="Your review on this Product"
                          label="Review"
                          register={register}
                          error={errors.review?.message}
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

export default RateProductForm;
