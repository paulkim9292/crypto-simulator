import { configureStore, createSlice } from "@reduxjs/toolkit";

const coinList = createSlice({
  name: "coinList",
  initialState: {},
  reducers: {
    setCoinList(state, action) {
      state.value = [...action.payload];
    },
  },
});

const searchList = createSlice({
  name: "searchList",
  initialState: {},
  reducers: {
    setSearchList(state, action) {
      state.value = [...action.payload];
    },
  },
});

const tickerList = createSlice({
  name: "tickerList",
  initialState: {},
  reducers: {
    updateTickerList(state, action) {
      const {
        code,
        // korean_name,
        trade_price,
        change,
        signed_change_price,
        signed_change_rate,
        acc_trade_price_24h,
        high_price,
        low_price,
        acc_trade_volume_24h,
      } = action.payload;

      state.value = {
        ...state.value,
        [code]: {
          code,
          // korean_name,
          trade_price,
          change,
          signed_change_price,
          signed_change_rate,
          acc_trade_price_24h,
          high_price,
          low_price,
          acc_trade_volume_24h,
        },
      };
    },
  },
});

const focusCoin = createSlice({
  name: "focusCoin",
  initialState: "KRW-BTC",
  reducers: {
    setFocusCoin(state, action) {
      return action.payload;
    },
  },
});

export const { setCoinList } = coinList.actions;
export const { setSearchList } = searchList.actions;
export const { updateTickerList } = tickerList.actions;
export const { setFocusCoin } = focusCoin.actions;

export default configureStore({
  reducer: {
    coinList: coinList.reducer,
    searchList: searchList.reducer,
    tickerList: tickerList.reducer,
    focusCoin: focusCoin.reducer,
  },
});
