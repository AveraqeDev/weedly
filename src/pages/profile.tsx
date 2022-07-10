import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NonIdealState from "../components/NonIdealState";
import { getUserInitials } from "../utils/string";

const Profile: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <Head>
        <title>My Profile | Weedly</title>
      </Head>
      <NonIdealState
        title="Coming Soon"
        subtitle="Profile is still on the way!"
        description="Profile is not available quite yet! Keep a close eye for the release!"
      />
    </>
  );
});

export default Profile;
