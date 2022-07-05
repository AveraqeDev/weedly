import { useUser } from "@auth0/nextjs-auth0";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ClockIcon, MinusIcon } from "@heroicons/react/outline";
import { ReUp, ReUpUpdate, Product } from "@prisma/client";
import Image from "next/image";
import { formatDate } from "../utils/date";
import { classNames, getUserInitials } from "../utils/string";
import Card from "./Card";

type ReUpCardProps = {
  reUp: ReUp & { products: Product[]; updates: ReUpUpdate[] };
};

const ReUpCard: React.FC<ReUpCardProps> = ({ reUp }) => {
  const { user } = useUser();
  return (
    <Card
      key={reUp.id}
      header={
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {reUp.title}
          </h3>
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
          <dt className="text-sm font-medium text-gray-500">Purchased From</dt>
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
                  <Disclosure.Button className="group rounded-full p-2 hover:bg-lime-500 hover:text-white focus:outline-none">
                    <ChevronUpIcon
                      className={classNames(
                        open ? "rotate-180 transform" : "",
                        "h-5 w-5 text-gray-500 group-hover:text-white"
                      )}
                    />
                  </Disclosure.Button>
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
                      {reUp.products.map((product, idx) => (
                        <li key={product.id}>
                          <div className="relative pb-8">
                            {idx !== reUp.products.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <span className="bg-lime-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                                <ClockIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {product.name}
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <span>{product.brand}</span>
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
        <div className="sm:col-span-2">
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex w-full justify-between text-left text-sm font-medium">
                  <span className="text-sm font-medium text-gray-500">
                    Updates
                  </span>
                  <Disclosure.Button className="group rounded-full p-2 hover:bg-lime-500 hover:text-white focus:outline-none">
                    <ChevronUpIcon
                      className={classNames(
                        open ? "rotate-180 transform" : "",
                        "h-5 w-5 text-gray-500 group-hover:text-white"
                      )}
                    />
                  </Disclosure.Button>
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
                            <div className="relative flex space-x-3">
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
                                  <time dateTime={formatDate(update.createdAt)}>
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
  );
};

export default ReUpCard;
