import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchList } from "../store/store";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchList);
  const coinList = useSelector((state) => state.coinList);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (coinList?.value && query === "") {
      dispatch(setSearchList(coinList.value));
    } else if (coinList?.value) {
      const filterData = coinList.value.filter((coin) =>
        coin.korean_name.includes(query)
      );
      dispatch(setSearchList(filterData));
    }
  }, [query, coinList]);

  return (
    <input
      className="w-full p-3"
      type="text"
      placeholder="코인명(한글) 검색"
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
  );
};

export default SearchBar;
