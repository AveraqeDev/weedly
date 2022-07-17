import { useUser } from "@auth0/nextjs-auth0";
import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HeartIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  ThumbDownIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useState } from "react";
import { ReUp } from "../shared/interfaces/ReUp";
import { formatDate } from "../utils/date";
import { classNames, getUserInitials } from "../utils/string";
import { trpc } from "../utils/trpc";
import AddProductToReUpForm from "./AddProductToReUpForm";
import AddUpdateForm from "./AddUpdateForm";
import Card from "./Card";
import RateProductForm from "./RateProductForm";
import Spinner from "./Spinner";

type ReUpCardProps = {
  reUp: ReUp;
};

const ReUpCard: React.FC<ReUpCardProps> = ({ reUp }) => {
  const [addProductFormOpen, setAddProductFormOpen] = useState(false);
  const [addUpdateFormOpen, setAddUpdateFormOpen] = useState(false);
  const [rateFormOpen, setRateFormOpen] = useState(false);
  const { user } = useUser();

  const utils = trpc.useContext();

  const { mutate: deleteReUp, isLoading: isDeleting } = trpc.useMutation(
    "reups.delete",
    {
      onSuccess(_) {
        utils.invalidateQueries("reups.list");
      },
    }
  );

  const { mutate: removeProduct, isLoading: isRemovingProduct } =
    trpc.useMutation("reups.remove-product", {
      onSuccess(_) {
        utils.invalidateQueries("reups.list");
      },
    });

  const { mutate: favoriteProduct, isLoading: isFavoritingProduct } =
    trpc.useMutation("products.favorite", {
      onSuccess(_) {
        utils.invalidateQueries("products.user-favorites");
      },
    });

  const { mutate: dislikeProduct, isLoading: isDislikingProduct } =
    trpc.useMutation("products.dislike", {
      onSuccess(_) {
        utils.invalidateQueries("products.user-dislikes");
      },
    });

  const { data: userFavorites } = trpc.useQuery(["products.user-favorites"]);
  const { data: userDislikes } = trpc.useQuery(["products.user-dislikes"]);

  return (
    <>
      <AddProductToReUpForm
        open={addProductFormOpen}
        setOpen={setAddProductFormOpen}
        reUp={reUp}
      />
      <AddUpdateForm
        open={addUpdateFormOpen}
        setOpen={setAddUpdateFormOpen}
        reUp={reUp}
      />
      <Card
        key={reUp.id}
        header={
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between gap-3 w-1/3 md:w-1/2">
              <Disclosure>
                {({ open, close }) => (
                  <div className="relative">
                    <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                      <DotsHorizontalIcon
                        className={classNames(
                          open ? "rotate-180 transform" : "",
                          "h-5 w-5 text-gray-500 group-hover:text-white"
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="origin-top-left absolute left-0 z-10">
                      <div className="flex flex-col bg-white py-1 ring-1 ring-gray-200 rounded-md">
                        <button
                          disabled={isDeleting}
                          className="disabled:cursor-not-allowed disabled:bg-gray-200 group flex items-center px-2 py-1 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                          onClick={() => {
                            deleteReUp({ id: reUp.id });
                            close();
                          }}
                        >
                          {isDeleting ? (
                            <div className="pr-2">
                              <Spinner size={5} />
                            </div>
                          ) : (
                            <MinusCircleIcon
                              className="text-lime-600 group-hover:text-white mr-3 h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                          <span>Delete</span>
                        </button>
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {reUp.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-1 max-w-2xl text-sm text-gray-500">
              {user?.picture ? (
                <Image
                  className="rounded-full"
                  src={user?.picture}
                  alt=""
                  width={32}
                  height={32}
                />
              ) : (
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-lime-500">
                  <span className="text-sm font-medium leading-none text-white">
                    {getUserInitials(user?.name || "Weedly User")}
                  </span>
                </span>
              )}
              <span>{user?.name}</span>
            </div>
          </div>
        }
      >
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mb-4">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(reUp.date)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Purchased From
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{reUp.from}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Total Spent</dt>
            <dd className="mt-1 text-sm text-gray-900">${reUp.total}</dd>
          </div>
          <div className="sm:col-span-2 border-t border-gray-200 pt-5">
            <dt className="text-sm font-medium text-gray-500">Thoughts</dt>
            <dd className="mt-1 text-sm text-gray-900">{reUp.thoughts}</dd>
          </div>
          <div className="sm:col-span-2 border-y border-gray-200 py-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="flex w-full justify-between text-left text-sm font-medium">
                    <span className="text-sm font-medium text-gray-500">
                      Products
                    </span>
                    <div className="flex items-center gap-2">
                      <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                        <ChevronUpIcon
                          className={classNames(
                            open ? "rotate-180 transform" : "",
                            "h-5 w-5 text-gray-500 group-hover:text-white"
                          )}
                        />
                      </Disclosure.Button>
                      <button
                        className="group bg-lime-500 h-7 w-7 rounded-full flex items-center justify-center ring-6 ring-white hover:bg-lime-400"
                        onClick={() => setAddProductFormOpen(true)}
                      >
                        <PlusIcon
                          className="h-5 w-5 text-white group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <dd className="flow-root mt-1 text-sm text-gray-900">
                      <ul role="list" className="-mb-8">
                        {reUp.products.length < 1 && (
                          <div className="flex items-center gap-2 pb-5">
                            <MinusIcon className="h-5 w-5 bg-red-500 rounded-full text-white" />
                            <p className="text-gray-400 text-xs">
                              No products provided
                            </p>
                          </div>
                        )}
                        {reUp.products.map((product) => (
                          <li key={product.product.id} className="pb-6">
                            <div className="flex space-x-3 items-center">
                              <Disclosure>
                                {({ open, close }) => (
                                  <div className="relative">
                                    <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                                      <DotsHorizontalIcon
                                        className={classNames(
                                          open ? "rotate-180 transform" : "",
                                          "h-5 w-5 text-gray-500 group-hover:text-white"
                                        )}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="origin-top-left absolute left-0 z-10">
                                      <div className="flex flex-col bg-white py-1 ring-1 ring-gray-200 rounded-md">
                                        <button
                                          disabled={isRemovingProduct}
                                          className="disabled:cursor-not-allowed disabled:bg-gray-200 group flex items-center px-2 py-1 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                                          onClick={() => {
                                            removeProduct({
                                              id: product.product.id,
                                              reUpId: reUp.id,
                                            });
                                            close();
                                          }}
                                        >
                                          <MinusCircleIcon
                                            className="text-lime-600 group-hover:text-white mr-3 h-6 w-6"
                                            aria-hidden="true"
                                          />
                                          <span>Remove</span>
                                        </button>
                                        <>
                                          <RateProductForm
                                            open={rateFormOpen}
                                            setOpen={setRateFormOpen}
                                            product={product.product}
                                          />
                                          <button
                                            className="disabled:cursor-not-allowed disabled:bg-gray-200 group flex items-center px-2 py-1 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                                            onClick={() => {
                                              setRateFormOpen(true);
                                              close();
                                            }}
                                          >
                                            <StarIcon
                                              className="text-lime-600 group-hover:text-white mr-3 h-6 w-6"
                                              aria-hidden="true"
                                            />
                                            <span>Rate</span>
                                          </button>
                                        </>
                                        <button
                                          disabled={
                                            userFavorites
                                              ?.map(
                                                (favorite) =>
                                                  favorite.product.id
                                              )
                                              .includes(product.product.id) ||
                                            userDislikes
                                              ?.map(
                                                (dislike) => dislike.product.id
                                              )
                                              .includes(product.product.id) ||
                                            isFavoritingProduct
                                          }
                                          className="disabled:cursor-not-allowed disabled:bg-gray-200 group flex items-center px-2 py-1 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                                          onClick={() => {
                                            favoriteProduct({
                                              id: product.product.id,
                                            });
                                            close();
                                          }}
                                        >
                                          <HeartIcon
                                            className="text-lime-600 group-hover:text-white mr-3 h-6 w-6"
                                            aria-hidden="true"
                                          />
                                          <span>Favorite</span>
                                        </button>
                                        <button
                                          disabled={
                                            userDislikes
                                              ?.map(
                                                (dislike) => dislike.product.id
                                              )
                                              .includes(product.product.id) ||
                                            userFavorites
                                              ?.map(
                                                (favorite) =>
                                                  favorite.product.id
                                              )
                                              .includes(product.product.id) ||
                                            isDislikingProduct
                                          }
                                          className="disabled:cursor-not-allowed disabled:bg-gray-200 group flex items-center px-2 py-1 text-sm text-lime-600 hover:text-white hover:bg-lime-500"
                                          onClick={() => {
                                            dislikeProduct({
                                              id: product.product.id,
                                            });
                                            close();
                                          }}
                                        >
                                          <ThumbDownIcon
                                            className="text-lime-600 group-hover:text-white mr-3 h-6 w-6"
                                            aria-hidden="true"
                                          />
                                          <span>Dislike</span>
                                        </button>
                                      </div>
                                    </Disclosure.Panel>
                                  </div>
                                )}
                              </Disclosure>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 items-center">
                                <div className="flex flex-col w-2/3">
                                  <p className="text-sm text-gray-900">
                                    {product.product.name}
                                  </p>
                                  <span className="text-xs text-gray-400">
                                    {product.product.brand}
                                  </span>
                                </div>
                                <div className="flex justify-end items-center flex-wrap gap-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {product.product.type}
                                  </span>
                                  {product.product.tags.map((tag) => (
                                    <span
                                      key={tag.id}
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tag-${tag.color} text-white`}
                                    >
                                      {tag.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="sm:col-span-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="flex w-full justify-between text-left text-sm font-medium">
                    <span className="text-sm font-medium text-gray-500">
                      Updates
                    </span>
                    <div className="flex items-center gap-2">
                      <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                        <ChevronUpIcon
                          className={classNames(
                            open ? "rotate-180 transform" : "",
                            "h-5 w-5 text-gray-500 group-hover:text-white"
                          )}
                        />
                      </Disclosure.Button>
                      <button
                        className="group bg-lime-500 h-7 w-7 rounded-full flex items-center justify-center ring-6 ring-white hover:bg-lime-400"
                        onClick={() => setAddUpdateFormOpen(true)}
                      >
                        <PlusIcon
                          className="h-5 w-5 text-white group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                    <dd className="flow-root mt-1 text-sm text-gray-900">
                      <ul role="list" className="-mb-8">
                        {reUp.updates.length < 1 && (
                          <div className="flex items-center gap-2 pt-2 mb-4">
                            <MinusIcon className="h-5 w-5 bg-red-500 rounded-full text-white" />
                            <p className="text-gray-500 text-xs">
                              No updates provided
                            </p>
                          </div>
                        )}
                        {reUp.updates.map((update, idx) => (
                          <li key={update.id}>
                            <div className="relative pb-8">
                              {idx !== reUp.updates.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3 items-center">
                                <span className="bg-lime-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                                  <ClockIcon
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                </span>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {update.text}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time
                                      dateTime={formatDate(update.createdAt)}
                                    >
                                      {formatDate(update.createdAt)}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </dl>
      </Card>
    </>
  );
};

export default ReUpCard;
