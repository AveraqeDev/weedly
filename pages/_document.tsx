import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-full">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
