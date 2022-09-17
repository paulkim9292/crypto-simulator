import Head from "next/head";

const HeadInfo = ({ title }) => {
  return (
    <Head>
      <title>Crypto-Simulator{title}</title>
      <meta name="description" content="가상화폐 모의 거래소" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "",
};

export default HeadInfo;
