import React, { useState, useEffect, useRef } from "react";

import Cryptowidget from "./Cryptowidget";
import axios from "axios";
import Marquee from "react-fast-marquee";
const CryptoData = () => {

	const [markets, setMarkets] = useState([]);
	const [search, setSearch] = useState("");
	  const count = useRef([]);


	useEffect(() => {
		const options = {
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: {
        vs_currency: "usd",
        page: "1",
        per_page: "10",
        order: "market_cap_desc",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API,
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };

		axios
			.request(options)

			.then((response) => {
				setMarkets(response.data);
			})
			.catch((error) => console.log(error));
	}, []);


	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredMarkets = markets.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);


	return (
    <div className="container col100">
      <div className="">
        <h2 className="top_Cryptocurrency container-xxl purple_text">
          {" "}
          Top Cryptocurrency{" "}
        </h2>

        <Marquee speed={15} pauseOnHover={false} gradient={false}>
          <div className="widget_scroll">
            {markets.map((market, i) => {
              return (
                <Cryptowidget
                  key={i}
                  keys={market.url}
                  name={market.name}
                  price={market.current_price}
                  image={market.image}
                  price_change_percentage_24h={
                    market.price_change_percentage_24h
                  }
                  market_cap_rank={market.market_cap_rank}
                />
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default CryptoData;
