import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/image2.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/image2.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/image2.webp"
        />
        <link rel="shortcut icon" href="/favicons/image2.webp" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/image2.webp"
          color="#5bbad5"
        />
        <meta name="google-site-verification" content="uTMoqMc9K_yllcCGoD_dA8iday1dBT178xhJfZyZhzw" />
        <meta name="msapplication-TileColor" content="#5bbad5" />
        <meta name="theme-color" content="#1d2a35" />

        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-bglight dark:bg-bgdark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
