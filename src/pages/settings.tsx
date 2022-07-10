import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

const Settings: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>Settings | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Settings are still on the way!"
        description="Settings are not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default Settings;
