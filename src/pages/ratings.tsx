import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

const Ratings: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <h1>Ratings</h1>
      <h2>{user.name}</h2>
    </>
  );
});

export default Ratings;
