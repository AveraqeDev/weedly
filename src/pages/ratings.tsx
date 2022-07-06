import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

type RatingsProps = {
  user: UserProfile;
};

const Ratings: NextPage<RatingsProps> = ({ user }) => {
  return (
    <>
      <h1>Ratings</h1>
      <h2>{user.name}</h2>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Ratings;
