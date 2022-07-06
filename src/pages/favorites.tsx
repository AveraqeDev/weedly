import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

type FavoritesProps = {
  user: UserProfile;
};

const Favorites: NextPage<FavoritesProps> = ({ user }) => {
  return (
    <>
      <h1>Favorites</h1>
      <h2>{user.name}</h2>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Favorites;
