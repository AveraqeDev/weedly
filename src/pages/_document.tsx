import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-screen">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
