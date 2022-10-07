import CoinInfo from "../components/CoinInfo";
import HeadInfo from "../components/HeadInfo";
import Orderbook from "../components/Orderbook";
import Ticker from "../components/Ticker";

export default function Home() {
  return (
    <main className="bg-gray-200 mx-auto w-[80rem] p-3">
      <HeadInfo />
      <section className="grid grid-cols-8 grid-rows-2 gap-3">
        <article className="bg-white drop-shadow-md col-span-6">
          <CoinInfo />
          <div>Chart</div>
        </article>
        <article className="bg-white drop-shadow-md col-span-2 row-span-2 h-[50rem]">
          <Ticker />
        </article>
        <article className="bg-white drop-shadow-md col-span-3">
          <Orderbook />
        </article>
        <article className="bg-white drop-shadow-md col-span-3">
          <div>거래</div>
        </article>
      </section>
    </main>
  );
}
