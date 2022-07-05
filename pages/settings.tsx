import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

type SettingsProps = {
  user: UserProfile;
};

const Settings: NextPage<SettingsProps> = ({ user }) => {
  return (
    <>
      <h1>Settings</h1>
      <h2>{user.name}</h2>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Settings;
