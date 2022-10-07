import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CoinInfo = () => {
  // global states 가져오기
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coinList);
  const tickerList = useSelector((state) => state.tickerList);
  const focusCoin = useSelector((state) => state.focusCoin);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!tickerList.value || !coinList.value) return;
    setLoading(false);
  }, [coinList, tickerList, focusCoin]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-4 grid-rows-3 mt-3 pb-3 border-b-4">
          <div className="col-span-2 flex items-center px-5">
            <div className="text-xl font-bold p-2">
              {
                coinList.value.find((coin) => coin.market === focusCoin)
                  .korean_name
              }
            </div>
            <div className="text-xs">{tickerList.value[focusCoin].code}</div>
          </div>
          <div
            className={`row-start-2 col-span-2 text-3xl px-7 font-semibold ${
              tickerList.value[focusCoin].change === "EVEN"
                ? ""
                : tickerList.value[focusCoin].change === "RISE"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {tickerList.value[focusCoin].trade_price.toLocaleString()}
            <span className="text-sm font-normal px-1">KRW</span>
          </div>
          <div
            className={`row-start-3 col-span-2 px-7 font-semibold ${
              tickerList.value[focusCoin].change === "EVEN"
                ? ""
                : tickerList.value[focusCoin].change === "RISE"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {tickerList.value[focusCoin].change === "RISE" ? <>+</> : <></>}
            {(tickerList.value[focusCoin].signed_change_rate * 100).toFixed(
              2
            )}%{" "}
            {tickerList.value[focusCoin].change === "EVEN" ? (
              <></>
            ) : tickerList.value[focusCoin].change === "RISE" ? (
              <>▲</>
            ) : (
              <>▼</>
            )}
            {tickerList.value[focusCoin].signed_change_price.toLocaleString()}
          </div>
          <div className="row-start-2 col-start-3 flex justify-around items-center">
            <span className="text-xs font-semibold">고가</span>
            <span className="text-sm text-red-600 font-semibold">
              {tickerList.value[focusCoin].high_price.toLocaleString()}
            </span>
          </div>
          <div className="row-start-3 col-start-3 flex justify-around items-center">
            <span className="text-xs font-semibold">저가</span>
            <span className="text-sm text-blue-600 font-semibold">
              {tickerList.value[focusCoin].low_price.toLocaleString()}
            </span>
          </div>
          <div className="row-start-2 col-start-4 flex justify-between items-center">
            <span className="text-xs font-semibold">거래량(24H)</span>
            <span className="text-sm px-3">
              {tickerList.value[focusCoin].acc_trade_volume_24h
                .toFixed(3)
                .toLocaleString()}
              <span className="text-[11px]"> BTC</span>
            </span>
          </div>
          <div className="row-start-3 col-start-4 flex justify-between items-center">
            <span className="text-xs font-semibold">거래대금(24H)</span>
            <span className="text-sm px-3">
              {Math.ceil(
                tickerList.value[focusCoin].acc_trade_price_24h
              ).toLocaleString()}
              <span className="text-[11px]"> KRW</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinInfo;
