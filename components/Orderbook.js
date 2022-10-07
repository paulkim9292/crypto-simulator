import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const Orderbook = () => {
  // global states 가져오기
  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coinList);
  const focusCoin = useSelector((state) => state.focusCoin);

  const [askOrderbook, setAskOrderbook] = useState();
  const [bidOrderbook, setBidOrderbook] = useState();

  // Websocket 열고 실시간 데이터 받아오기
  useEffect(() => {
    if (!coinList || !focusCoin) return;
    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    ws.binaryType = "arraybuffer";
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify([
          { ticket: v4() },
          { type: "orderbook", codes: [focusCoin] },
        ])
      );
    };
    ws.onmessage = async (event) => {
      const encoder = new TextDecoder("utf-8");
      const rawData = new Uint8Array(event.data);
      const data = JSON.parse(encoder.decode(rawData));

      const ask = data.orderbook_units.map((order) => {
        return { ask_price: order.ask_price, ask_size: order.ask_size };
      });

      const bid = data.orderbook_units.map((order) => {
        return { bid_price: order.bid_price, bid_size: order.bid_size };
      });

      setAskOrderbook(ask.reverse().slice(8));
      setBidOrderbook(bid.slice(0, 7));
    };
    return () => {
      ws.close();
    };
  }, [coinList, focusCoin]);

  return (
    <>
      <div className="grid grid-cols-3 items-center text-center h-8 text-base font-bold">
        <div className="text-blue-500">매도량</div>
        <div>호가</div>
        <div className="text-red-500">매수량</div>
      </div>
      {askOrderbook?.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-3 items-center text-center bg-blue-100 border-y border-white h-11"
        >
          <div className="text-[15px]">
            {order.ask_size.toFixed(3)}
            {"  "}
            <span className="text-[12px]">BTC</span>
          </div>
          <div className="text-[15px] text-blue-700 font-bold">
            {order.ask_price.toLocaleString()}
          </div>
          <div></div>
        </div>
      ))}
      {bidOrderbook?.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-3 items-center text-center bg-red-100 border-y border-white h-11"
        >
          <div></div>
          <div className="text-[15px] text-blue-700 font-bold">
            {order.bid_price.toLocaleString()}
          </div>
          <div className="text-[15px]">
            {order.bid_size.toFixed(3)}
            {"  "}
            <span className="text-[12px]">BTC</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orderbook;
