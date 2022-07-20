import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
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

const Dislikes: NextPage = withPageAuthRequired(() => {
  const { data: userDislikes, isLoading: userDislikesLoading } = trpc.useQuery([
    "products.user-dislikes",
  ]);

  const utils = trpc.useContext();

  const { mutate: deleteDislike, isLoading: isDeleting } = trpc.useMutation(
    "products.delete-dislike",
    {
      onSuccess() {
        utils.invalidateQueries("products.user-dislikes");
      },
    }
  );

  return (
    <>
      <Head>
        <title>My Dislikes | Weedly</title>
      </Head>
      {userDislikesLoading ? (
        <Spinner />
      ) : userDislikes ? (
        <div className="max-w-4xl m-auto">
          <div className="flex justify-between mt-10 mb-10">
            <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-lime-500 pr-5">
              My Dislikes
            </h2>
          </div>
          <div className="bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userDislikes.length > 0 ? (
                userDislikes.map((dislike) => (
                  <li key={dislike.id}>
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
                                                deleteDislike({
                                                  id: dislike.id,
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
                                    {dislike.product.name}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({dislike.product.brand})
                                  </span>
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                                  >
                                    ${dislike.product.price}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex sm:gap-1">
                                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {dislike.product.type}
                                  </p>
                                  {dislike.product.tags.map((tag) => (
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
                                    Disliked on{" "}
                                    <time
                                      dateTime={formatDate(dislike.addedAt)}
                                    >
                                      {formatDate(dislike.addedAt)}
                                    </time>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Disclosure.Panel className="p-4">
                            <p className="text-sm">
                              {dislike.product.description}
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
                  <p className="text-gray-500 text-xs">No dislikes found</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div>No Dislikes</div>
      )}
    </>
  );
});

export default Dislikes;
