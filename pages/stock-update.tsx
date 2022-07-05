import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

type StockUpdateProps = {
  user: UserProfile;
};

const StockUpdate: NextPage<StockUpdateProps> = ({ user }) => {
  return (
    <>
      <h1>Stock Update</h1>
      <h2>{user.name}</h2>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default StockUpdate;
