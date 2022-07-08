import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

const StockUpdate: NextPage = withPageAuthRequired(({ user }) => {
  return (
    <>
      <h1>Stock Update</h1>
      <h2>{user.name}</h2>
    </>
  );
});

export default StockUpdate;
