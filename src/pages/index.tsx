import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PlusIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useState } from "react";
import AddReUpForm from "../components/AddReUpForm";
import ReUpCard from "../components/ReUpCard";

const Home: NextPage = withPageAuthRequired(() => {
  const [formOpen, setFormOpen] = useState(false);

  const reUps: any[] = [];

  return (
    <>
      <AddReUpForm open={formOpen} setOpen={setFormOpen} />
      {reUps.length < 1 ? (
        <div className="w-1/3 sm:w-1/2 mx-auto mt-20 py-5 border border-dashed border-gray-400 rounded-2xl text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No ReUps</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new ReUp.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              onClick={() => setFormOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New ReUp
            </button>
          </div>
        </div>
      ) : (
        <div className="lg:w-2/3 md:w-3/4 w-full px-6 md:px-0 md:mx-auto flex flex-col gap-10">
          <div className="flex justify-between mt-10">
            <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-lime-500 pr-5">
              ReUps
            </h2>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              onClick={() => setFormOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New ReUp
            </button>
          </div>
          {reUps.map((reUp) => (
            <ReUpCard key={reUp.id} reUp={reUp} />
          ))}
        </div>
      )}
    </>
  );
});

export default Home;
