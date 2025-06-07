import Head from 'next/head';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SPS</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
