import Head from "next/head";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Weedly</title>
      </Head>
      <header className="shadow">
        <Header />
      </header>
      <main className="max-w-7xl m-auto px-4 py-6">{children}</main>
    </>
  );
};

export default Layout;
