import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Data() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/search/trending
`
      )
      .then((res) => {
        setMarkets(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(markets.data);

  return (
    <div className="widget_scroll">
    
    </div>
  );
}
