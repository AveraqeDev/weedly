import Head from "next/head";
import NonIdealState from "../components/NonIdealState";

export default function Error() {
  return (
    <>
      <Head>
        <title>404 | Weedly</title>
      </Head>
      <NonIdealState
        title="404"
        subtitle="Page not found"
        description="Please check the URL in the address bar and try again"
      />
    </>
  );
}
