import HeadInfo from "../components/HeadInfo";
import Ticker from "../components/Ticker";

export default function Home() {
  return (
    <main className="bg-gray-200 mx-auto w-[80rem] p-3">
      <HeadInfo />
      <section className="grid grid-cols-4 grid-rows-2 gap-3">
        <article className="bg-white drop-shadow-md col-span-3">
          <div>CoinInfo</div>
          <div>Chart</div>
        </article>
        <article className="bg-white drop-shadow-md row-span-2 h-[50rem]">
          <Ticker />
        </article>
        <article className="bg-white drop-shadow-md col-span-3 flex">
          <div>호가</div>
          <div>거래</div>
        </article>
      </section>
    </main>
  );
}
