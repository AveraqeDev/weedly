import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

type DislikesProps = {
  user: UserProfile;
};

const Dislikes: NextPage<DislikesProps> = ({ user }) => {
  return (
    <>
      <h1>Dislikes</h1>
      <h2>{user.name}</h2>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Dislikes;
