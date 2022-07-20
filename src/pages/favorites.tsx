import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  CalendarIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  MinusCircleIcon,
  MinusIcon,
} from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Spinner from "../components/Spinner";
import { formatDate } from "../utils/date";
import { classNames } from "../utils/string";
import { trpc } from "../utils/trpc";

const Favorites: NextPage = withPageAuthRequired(({ user }) => {
  const { data: userFavorites, isLoading: userFavoritesLoading } =
    trpc.useQuery(["products.user-favorites"]);

  const utils = trpc.useContext();

  const { mutate: deleteFavorite, isLoading: isDeleting } = trpc.useMutation(
    "products.delete-favorite",
    {
      onSuccess() {
        utils.invalidateQueries("products.user-favorites");
      },
    }
  );

  return (
    <>
      <Head>
        <title>My Favorites | Weedly</title>
      </Head>
      {userFavoritesLoading ? (
        <Spinner />
      ) : userFavorites ? (
        <div className="max-w-4xl m-auto">
          <div className="flex justify-between mt-10 mb-10">
            <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-lime-500 pr-5">
              My Favorites
            </h2>
          </div>
          <div className="bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userFavorites.length > 0 ? (
                userFavorites.map((favorite) => (
                  <li key={favorite.id}>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <div className="block">
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="flex items-center gap-2">
                                  <Menu as="div" className="ml-3 relative">
                                    <div>
                                      <Menu.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                                        <DotsHorizontalIcon className="h-5 w-5 text-gray-500 group-hover:text-white" />
                                      </Menu.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="origin-top-left absolute right-0 mt-2 w-36 z-10 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              className={classNames(
                                                active
                                                  ? "bg-lime-500 text-white"
                                                  : "",
                                                "w-full group flex items-center px-4 py-2 text-sm text-lime-600 hover:text-white hover:bg-lime-500 disabled:cursor-not-allowed disabled:bg-gray-200"
                                              )}
                                              disabled={isDeleting}
                                              onClick={() => {
                                                deleteFavorite({
                                                  id: favorite.id,
                                                });
                                                close();
                                              }}
                                            >
                                              {isDeleting ? (
                                                <div className="pr-2">
                                                  <Spinner size={5} />
                                                </div>
                                              ) : (
                                                <MinusCircleIcon
                                                  className={classNames(
                                                    active
                                                      ? "bg-lime-500 text-white"
                                                      : "text-lime-600 group-hover:text-white",
                                                    "mr-3 h-6 w-6"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                              )}
                                              <span>Delete</span>
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                  <span className="text-md font-medium text-lime-600">
                                    {favorite.product.name}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({favorite.product.brand})
                                  </span>
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                                  >
                                    ${favorite.product.price}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex sm:gap-1">
                                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {favorite.product.type}
                                  </p>
                                  {favorite.product.tags.map((tag) => (
                                    <p
                                      key={tag.id}
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tag-${tag.color} text-white`}
                                    >
                                      {tag.name}
                                    </p>
                                  ))}
                                </div>
                                <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "rotate-180 transform" : "",
                                      "h-5 w-5 text-gray-500 group-hover:text-white"
                                    )}
                                  />
                                </Disclosure.Button>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <CalendarIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <p>
                                    Favorited on{" "}
                                    <time
                                      dateTime={formatDate(favorite.addedAt)}
                                    >
                                      {formatDate(favorite.addedAt)}
                                    </time>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Disclosure.Panel className="max-w-3xl m-auto p-4">
                            <p className="text-sm">
                              {favorite.product.description}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                ))
              ) : (
                <div className="flex items-center gap-2 p-4">
                  <MinusIcon className="h-5 w-5 bg-red-500 rounded-full text-white" />
                  <p className="text-gray-500 text-xs">No favorites found</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div>No Favorites</div>
      )}
    </>
  );
});

export default Favorites;
