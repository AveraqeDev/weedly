import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Disclosure } from "@headlessui/react";
import { CalendarIcon, ChevronUpIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import Spinner from "../components/Spinner";
import { formatDate } from "../utils/date";
import { classNames } from "../utils/string";
import { trpc } from "../utils/trpc";

const getColorFromRating = (rating: number): string => {
  switch (rating) {
    case 5:
      return "green";
    case 4:
      return "lime";
    case 3:
      return "yellow";
    case 2:
      return "orange";
    default:
      return "red";
  }
};

const Ratings: NextPage = withPageAuthRequired(({ user }) => {
  const { data: userRatings, isLoading: userRatingsLoading } = trpc.useQuery([
    "products.user-ratings",
  ]);

  return (
    <>
      <Head>
        <title>My Ratings | Weedly</title>
      </Head>
      {userRatingsLoading ? (
        <Spinner />
      ) : userRatings ? (
        <div className="max-w-5xl m-auto">
          <div className="flex justify-between mt-10 mb-10">
            <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-lime-500 pr-5">
              My Ratings
            </h2>
          </div>
          <div className="bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userRatings.map((rating) => (
                <li key={rating.id}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <div className="block">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="flex items-center gap-2 truncate">
                                <span className="text-md font-medium text-lime-600">
                                  {rating.product.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({rating.product.brand})
                                </span>
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full rating-${getColorFromRating(
                                    rating.rating
                                  )}`}
                                >
                                  {rating.rating} Star
                                  {rating.rating > 1 && "s"}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex sm:gap-1">
                                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {rating.product.type}
                                </p>
                                {rating.product.tags.map((tag) => (
                                  <p
                                    key={tag.id}
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tag-${tag.color} text-white`}
                                  >
                                    {tag.name}
                                  </p>
                                ))}
                              </div>
                              <Disclosure.Button className="group rounded-full p-1 hover:bg-lime-500 hover:text-white focus:outline-none">
                                <ChevronUpIcon
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
                                  Rated on{" "}
                                  <time dateTime={formatDate(rating.createdAt)}>
                                    {formatDate(rating.createdAt)}
                                  </time>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Disclosure.Panel className="p-4">
                          <p className="text-sm">{rating.review}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>No Ratings</div>
      )}
    </>
  );
});

export default Ratings;
