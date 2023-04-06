import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Data from "../globalCrypoData/Data";

import CoinDisplay from "../coinSearch/CoinDisplay";
const CoinData = ({
  id,
  market_cap_rank,
  name,
  symbol,
  image,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h,
  total_volume,
  market_cap,
  circulating_supply,
  sparkline_in_7d,
  price_change_percentage_7d_in_currency,
}) => {
  const [markets, setMarkets] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState(markets);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCrypto, settotalCrypto] = useState([]);
  const [data, setData] = useState(false);

  const router = useRouter();
  // Global Market Cap;
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/global`)

      .then((res) => {
        settotalCrypto(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // pagenation
  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    setFilteredCoins(
      markets.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setFilteredCoins(markets);
  }, [markets]);

  //hander pagenation

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(
      `coins/?page=${value}`,
      undefined,
      { shallow: false },
      { scroll: true }
    );
  }

  //paganation control
  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);

  const perPage = 30;
  const totalListedCoins = totalCrypto?.data?.active_cryptocurrencies;

  const result = totalListedCoins / perPage;

  // if (data == false)
  //   return (
  //     <div className="loader-3">
  //       <div className="circle"></div>
  //       <div className="circle"></div>
  //       <div className="circle"></div>
  //       <div className="circle"></div>
  //       <div className="circle"></div>
  //     </div>
  //   );

  return (
    <tr target="_blank" className="market_Hover">
      <td className="market_cap_rank">
        <>{market_cap_rank}</>
      </td>
      <td className="coin_name_widget">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <div className="">
            <img src={image} alt="coin" />
          </div>
          <h4 className="coin_name_widget_s">{name} </h4>
          <h4 className="coin_symbol_widget">{symbol} </h4>
        </Link>
      </td>
      <td className="coin_price">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <h4 className="coin_price">
            $
            {current_price?.toLocaleString({
              maximumFractionDigits: 5,
            }) < 10
              ? current_price
              : current_price?.toLocaleString()}
          </h4>
        </Link>
      </td>

      <td className="price_change_percentage_1h_in_currency">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <div className="">
            {price_change_percentage_1h_in_currency < 0 ? (
              <p className="red">
                {price_change_percentage_1h_in_currency &&
                  price_change_percentage_1h_in_currency.toFixed(2)}
                % <i className="bi bi-caret-down-fill"></i>{" "}
              </p>
            ) : (
              <p className="green">
                {price_change_percentage_1h_in_currency &&
                  price_change_percentage_1h_in_currency.toFixed(2)}
                % <i className="bi bi-caret-up-fill"></i>{" "}
              </p>
            )}
          </div>
        </Link>
      </td>

      <td className="price_change_percentage_24h">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <div className="">
            {price_change_percentage_24h < 0 ? (
              <p className="red">
                {price_change_percentage_24h &&
                  price_change_percentage_24h.toFixed(1)}
                % <i className="bi bi-caret-down-fill"></i>{" "}
              </p>
            ) : (
              <p className="green">
                {price_change_percentage_24h &&
                  price_change_percentage_24h.toFixed(1)}
                % <i className="bi bi-caret-up-fill"></i>{" "}
              </p>
            )}
          </div>
        </Link>
      </td>

      <td className="price_change_percentage_7d_in_currency last_7h">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <div className="">
            {price_change_percentage_7d_in_currency < 0 ? (
              <p className="red">
                {price_change_percentage_7d_in_currency &&
                  price_change_percentage_7d_in_currency.toFixed(3)}
                % <i className="bi bi-caret-down-fill"></i>{" "}
              </p>
            ) : (
              <p className="green">
                {price_change_percentage_7d_in_currency &&
                  price_change_percentage_7d_in_currency.toFixed(3)}
                % <i className="bi bi-caret-up-fill"></i>{" "}
              </p>
            )}
          </div>
        </Link>
      </td>

      <td className="total_volume">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          <div className="">
            {total_volume?.toLocaleString({
              maximumFractionDigits: 5,
            }) < 10
              ? total_volume
              : total_volume?.toLocaleString()}
          </div>
        </Link>
      </td>

      <td className="market_cap">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          {" "}
          {market_cap?.toLocaleString({
            maximumFractionDigits: 5,
          }) < 10
            ? market_cap
            : market_cap?.toLocaleString()}
        </Link>
      </td>

      <td className="circulating_supply">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          {" "}
          {circulating_supply?.toLocaleString({
            maximumFractionDigits: 5,
          }) < 10
            ? circulating_supply
            : circulating_supply?.toLocaleString()}{" "}
        </Link>
      </td>

      <td className="sparkline_in_7d">
        <Link
          target="_blank"
          passHref
          rel="noopener noreferrer"
          href={`/coins/${id}`}
          key={id}
        >
          {price_change_percentage_7d_in_currency < 0 ? (
            <p className="">
              <Sparklines data={sparkline_in_7d}>
                <SparklinesLine color="red" />
              </Sparklines>
            </p>
          ) : (
            <p className="">
              <Sparklines data={sparkline_in_7d}>
                <SparklinesLine color="green" />
              </Sparklines>
            </p>
          )}
        </Link>
      </td>
    </tr>
  );
};

export default CoinData;

{
  /* 
                  {markets.map((market, i) => {
                    return (
                    
                    );
                  })} */
}
