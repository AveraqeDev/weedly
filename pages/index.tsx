import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <h1>Weedly</h1>
      <a href="/api/auth/login">Login</a>
      <br />
      <a href="/api/auth/logout">Logout</a>
    </>
  );
};

export default Home;
