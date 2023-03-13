import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useParams } from "react-router-dom";
//price charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import Overview from "../../components/IDPage/Overview";
import Topsection from "../../components/IDPage/Topsection";

//price charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement
);

const CoinData = dynamic(
  () => import("../../components/coinWidget/CryptoData"),
  { ssr: false }
);

const CoinId = ({ coinPriceChart, coin }) => {
  const { id } = useParams();

  // console.log(coin)

  return (
    <div className="">
      <Topsection
        id={coin?.id}
        name={coin.name}
        symbol={coin.symbol}
        market_data={coin.market_data}
        market_cap_rank={coin.market_cap_rank}
        coinPriceChart={coinPriceChart}
        coin={coin}
        categories={coin?.categories ? coin?.categories[0] : coin?.categories}
        image={coin?.image && coin.image.small}
        links={coin.links}
        cryptoID={coin?.id}
      />

      {/* Overview section */}

      <Overview
        name={coin.name}
        symbol={coin.symbol}
        market_data={coin.market_data}
        market_cap_rank={coin.market_cap_rank}
        coinPriceChart={coinPriceChart}
        coin={coin}
        tickers={coin.tickers}
        // name={coin.name}
        // name={coin.name}
      />

      {/* Description */}
      <div className="Description container">
        <header>{coin.name} Description</header>
        <section
          className="coin_description"
          dangerouslySetInnerHTML={{ __html: coin.description.en }}
        ></section>
        <hr />
        <div className="votes_percentage">
          <section className="sentiment_votes_up_percentage">
            Positive Vote Rate Today: 
            <span>{coin.sentiment_votes_up_percentage}%</span>{" "}
          </section>
          <section className="sentiment_votes_down_percentage">
            Negative Vote Rate Today: 
            <span>{coin.sentiment_votes_down_percentage}%</span>{" "}
          </section>{" "}
        </div>
      </div>
      {/* Markets */}
      <CoinData />
    </div>
  );
};

export default CoinId;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const resquest =
    await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1d
    `);

  const CoinIdData = await resquest.json();

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}
    `);
  const data = await res.json();
  return {
    props: {
      coinPriceChart: CoinIdData,
      coin: data,
    },
  };
}
