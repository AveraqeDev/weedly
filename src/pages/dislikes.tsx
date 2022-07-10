import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

const Dislikes: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>My Dislikes | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Dislikes are still on the way!"
        description="Dislikes are not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default Dislikes;
