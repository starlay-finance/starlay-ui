import Head from 'next/head'

export const Favicons = () => (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/assets/favicons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/assets/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/assets/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="mask-icon"
      href="/assets/favicons/safari-pinned-tab.svg"
      color="#758bfd"
    />
    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="apple-mobile-web-app-title" content="Starlay" />
    <meta name="application-name" content="Starlay" />
    <meta name="msapplication-TileColor" content="#758bfd" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="theme-color" content="#000000" />
  </Head>
)
