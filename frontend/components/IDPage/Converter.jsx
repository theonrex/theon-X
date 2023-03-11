import React, { useState } from "react";

function Converter({
  id,
  coin,
  name,
  symbol,
  market_data,
  market_cap_rank,
  coinPriceChart,
}) {
  const [amount, setAmount] = useState(1);
  const [rateAmount, setRateAmount] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [crypto, setCrypto] = useState(coin?.id);
  const [result, setResult] = useState(null);
  const [rateResult, setRateResult] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
      );
      const data = await response.json();
      const price = data[crypto][currency];
      const converted = amount * price;
      setResult(converted);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleRateChange = async (e) => {
    setRateAmount(e.target.value);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
      );
      const data = await response.json();
      const price = data[crypto][currency];
      const converted = e.target.value / price;
      setRateResult(converted);
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  return (
    <div className="Converter container">
      <header> {coin?.id} Converter</header>

      {result && (
        <p>
          {amount} {crypto.toUpperCase()} = {result.toFixed(1)}{" "}
          {currency.toUpperCase()}
        </p>
      )}

      {rateResult && (
        <p>
          {rateAmount} {currency.toUpperCase()} = {rateResult.toFixed(1)}{" "}
          {crypto.toUpperCase()}
        </p>
      )}
      <hr />
      <form onSubmit={handleSubmit}>
        <label className="coin_id_converter">
          {coin?.id} Amount
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <div className="coin_id_currency">
          <label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="ngn">NGN</option>
            </select>
            {currency.toUpperCase()} Amount
          </label>
          <input type="number" value={rateAmount} onChange={handleRateChange} />
        </div>

        <br />
        {/* <div value={crypto}> {crypto}</div> */}
        <button type="submit" className="purple_btn_normal">
          Convert
        </button>
      </form>
    </div>
  );
}

export default Converter;
