import { useUser } from "@auth0/nextjs-auth0";
import { FolderAddIcon, LoginIcon, PlusIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddReUpForm from "../components/AddReUpForm";
import ReUpCard from "../components/ReUpCard";
import Spinner from "../components/Spinner";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { user, isLoading: userLoading } = useUser();
  const [formOpen, setFormOpen] = useState(false);

  const { data: reUps, isLoading: reUpsLoading } = trpc.useQuery([
    "reups.list",
  ]);

  if (userLoading || reUpsLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Home | Weedly</title>
        </Head>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-20 py-5 border border-dashed border-gray-400 rounded-2xl text-center">
          <LoginIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Welcome to{" "}
            <span className="font-semibold text-lime-600">Weedly</span>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by logging in.
          </p>
          <div className="mt-6">
            <Link href="/api/auth/login">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-lime-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                <LoginIcon className="h-6 w-6" aria-hidden="true" />
                <span>Login</span>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home | Weedly</title>
      </Head>
      <AddReUpForm open={formOpen} setOpen={setFormOpen} />
      {!reUps || reUps.length <= 0 ? (
        <div className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-20 py-5 border border-dashed border-gray-400 rounded-2xl text-center">
          <FolderAddIcon className="mx-auto h-12 w-12 text-gray-400" />
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
};

export default Home;
