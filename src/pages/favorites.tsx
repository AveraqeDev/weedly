import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

const Favorites: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>My Favorites | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Favorites are still on the way!"
        description="Favorites are not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default Favorites;
