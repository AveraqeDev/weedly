import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

const Ratings: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>My Ratings | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Ratings are still on the way!"
        description="Ratings are not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default Ratings;
