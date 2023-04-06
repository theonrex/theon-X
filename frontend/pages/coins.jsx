import React, { useState, useEffect, useRef } from "react";
import CoinData from "../components/coinData/CoinData";
import Data from "../components/globalCrypoData/Data";
import CoinDisplay from "../components/coinSearch/CoinDisplay";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useRouter } from "next/router";

export default function Price({ coinTable, Total_Listed_Coins }) {
  const [markets, setMarkets] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState(markets);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCrypto, setTotalCrypto] = useState(
    Total_Listed_Coins.data?.active_cryptocurrencies
  );
  const [data, setData] = useState(false);

  const router = useRouter();

  // pagenation
  const loadMore = () => {
    setPage((page) => page + 1);
  };

  //search
  const handleChange = (e) => {
    setSearch(e.target.value);
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

  const result = totalCrypto / perPage;

  // if (data === false)
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
    <div>
      {coinTable ? (
        <div className="container-xxl">
          <div className="coinData_container">
            <div className="col100">
              <div className="CoinDisplay_data">
                <CoinDisplay />
                <Data />
              </div>
              <div className="market_data">
                <table>
                  <tbody>
                    <tr className="table_tr_id">
                      <th className="market_cap_rank">No</th>
                      <th className="market_cap_rank">Coin</th>
                      <th className="market_cap_rank">Price</th>
                      <th className="last_1h">1h</th>
                      <th className="market_cap_rank">24h</th>
                      <th className="last_7h">7d</th>
                      <th className="coin_24_Volume">24 Volume</th>
                      <th className="market_cap_rank market_cap_head">
                        Mkt Cap
                      </th>
                      <th className="circulating_supply">Circulating Supply</th>
                      <th className="Last_7_Days">Last 7 Days</th>
                    </tr>
                  </tbody>

                  <tbody>
                    {coinTable &&
                      coinTable.map((coinTableData, i) => {
                        return (
                          <CoinData
                            i={coinTableData.i}
                            id={coinTableData.id}
                            name={coinTableData.name}
                            market_cap_rank={coinTableData.market_cap_rank}
                            symbol={coinTableData.symbol}
                            image={coinTableData.image}
                            current_price={coinTableData.current_price}
                            price_change_percentage_1h_in_currency={
                              coinTableData.price_change_percentage_1h_in_currency
                            }
                            price_change_percentage_24h={
                              coinTableData.price_change_percentage_24h
                            }
                            total_volume={coinTableData.total_volume}
                            market_cap={coinTableData.market_cap}
                            circulating_supply={
                              coinTableData.circulating_supply
                            }
                            price_change_percentage_7d_in_currency={
                              coinTableData.price_change_percentage_7d_in_currency
                            }
                            sparkline_in_7d={
                              coinTableData.sparkline_in_7d.price
                            }
                          />
                        );
                      })}
                  </tbody>
                </table>

                <div className="stack_pagenation">
                  <Stack spacing={1}>
                    <Pagination
                      variant="outlined"
                      shape="rounded"
                      className="pagination"
                      page={page}
                      size="small"
                      onChange={handlePaginationChange}
                      count={parseInt(result.toFixed(0))}
                      color="secondary"
                    />
                  </Stack>

                  {/* <Pagenations/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-3">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}

      
    </div>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;
  const request = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`
  );

  console.log("request", request);

  const coinPageData = await request.json();

  const res = await fetch(`https://api.coingecko.com/api/v3/global`);
  const data = await res.json();

  return {
    props: {
      coinTable: coinPageData,
      Total_Listed_Coins: data,
    },
  };
}
