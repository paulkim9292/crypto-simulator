import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoinList, setSearchList, updateTickerList } from "../store/store";
import { v4 } from "uuid";
import axios from "axios";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Ticker = () => {
  // global states 가져오기
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coinList);
  const tickerList = useSelector((state) => state.tickerList);
  const searchList = useSelector((state) => state.searchList);

  // 코인 리스트 axois로 가져오기
  const getCoinList = async () => {
    try {
      const response = await axios
        .get("https://api.upbit.com/v1/market/all")
        .then((response) => response.data)
        .then((data) => {
          if (data) {
            const sortedCoinList = data.filter(
              (coin) => coin.market.split("-")[0] === "KRW"
            );

            dispatch(setCoinList(sortedCoinList));
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoinList();
  }, []);

  // Websocket 열고 실시간 데이터 받아오기
  useEffect(() => {
    if (!coinList) return;
    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.binaryType = "arraybuffer";
    ws.onopen = (event) => {
      const codes = coinList?.value?.map((coin) => coin.market);
      ws.send(JSON.stringify([{ ticket: v4() }, { type: "ticker", codes }]));
    };
    ws.onmessage = async (event) => {
      const encoder = new TextDecoder("utf-8");
      const rawData = new Uint8Array(event.data);
      const data = JSON.parse(encoder.decode(rawData));
      dispatch(updateTickerList(data));
    };
  }, [coinList]);

  return (
    <>
      <SearchBar />
      <div className="flex justify-around items-center text-center bg-gray-100 text-xs py-2">
        <span className="basis-1/3">한글명</span>
        <span className="basis-1/6">현재가</span>
        <span className="basis-1/6">전일대비</span>
        <span className="basis-1/6">거래대금</span>
      </div>
      <div className="overflow-y-auto scrollbar text-xs h-[45rem]">
        {searchList?.value?.map((coin) => {
          const change = tickerList?.value?.[coin.market]?.change;
          return (
            <div
              key={coin.market}
              className="flex justify-around items-center h-11 border-b-2 hover:bg-gray-200"
            >
              <span className="basis-1/3">
                <div className="font-bold">{coin.korean_name}</div>
                <div className="text-[11px]">{coin.market}</div>
              </span>
              <span
                className={`basis-1/6 text-right font-bold ${
                  change === "EVEN"
                    ? ""
                    : change === "RISE"
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {tickerList?.value?.[coin.market]?.trade_price.toLocaleString()}
              </span>
              <span
                className={`basis-1/6 text-right ${
                  change === "EVEN"
                    ? ""
                    : change === "RISE"
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                <div>
                  {(
                    tickerList?.value?.[coin.market]?.signed_change_rate * 100
                  ).toFixed(2)}
                  %
                </div>
                <div className="text-[11px]">
                  {tickerList?.value?.[
                    coin.market
                  ]?.signed_change_price.toLocaleString()}
                </div>
                <div></div>
              </span>
              <span className="basis-1/6 text-right">
                <div>
                  {Math.ceil(
                    tickerList?.value?.[coin.market]?.acc_trade_price_24h /
                      1000000
                  ).toLocaleString()}
                </div>
                <div className="text-[11px] opacity-50">백만</div>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ticker;
