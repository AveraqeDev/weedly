import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

const StockUpdate: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>Stock Update | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Stock Updates are still on the way!"
        description="Stock Updates are not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default StockUpdate;
