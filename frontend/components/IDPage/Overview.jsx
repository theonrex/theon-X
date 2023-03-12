import React from "react";
import Market from "../Market/Market";
import { Line } from "react-chartjs-2";
import Converter from "./Converter";
export default function Overview({
  id,
  cryptoID,
  coin,
  name,
  symbol,
  market_data,
  market_cap_rank,
  coinPriceChart,
  tickers,
}) {
  //line chart
  const coinChart = {
    labels: coinPriceChart?.prices?.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price",
        data: coinPriceChart.prices.map((price) => price[1]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: true,
          },
        },
      },
    },
  };

  //price charts
  const coinChartData = coinPriceChart.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));
  //price charts

  const options = {
    responsive: true,
  };

  return (
    <div className="overview">
      <hr />

      <div className="rowx container ">
        <div className="col70">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Overview
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Market
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Historical Data
              </button>
              <button
                className="nav-link"
                id="nav-converter-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-converter"
                type="button"
                role="tab"
                aria-controls="nav-converter"
                aria-selected="false"
              >
                Converter
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabIndex="0"
            >
              <div>
                <header className="price_chart_id_coin">
                  24 {name} Price Chart
                  <span> ({symbol}/USD)</span>
                </header>
                <Line data={coinChart} />
              </div>
              <div className="price_change_percentage_1h_in_currency_id">
                <header> Price Change Percentage</header>
                <table className="price_change_percentage_table">
                  <tbody>
                    <tr className="price_change_percentage_tr">
                      <th>1h</th>
                      <th>24 h</th>
                      <th>7 d</th>
                      <th>30 d</th>
                      <th>1 y</th>
                    </tr>
                    <tr className="price_change_percentage_tr">
                      <td>
                        {" "}
                        {market_data.price_change_percentage_1h_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {market_data.price_change_percentage_1h_in_currency
                              .usd &&
                              market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {market_data.price_change_percentage_1h_in_currency
                              .usd &&
                              market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>
                      <td>
                        {market_data.price_change_percentage_24h_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {market_data.price_change_percentage_24h_in_currency
                              .usd &&
                              market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {market_data.price_change_percentage_24h_in_currency
                              .usd &&
                              market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}{" "}
                      </td>
                      <td>
                        {market_data.price_change_percentage_7d_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {market_data.price_change_percentage_7d_in_currency
                              .usd &&
                              market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {market_data.price_change_percentage_7d_in_currency
                              .usd &&
                              market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>{" "}
                      <td>
                        {market_data.price_change_percentage_30d_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {market_data.price_change_percentage_30d_in_currency
                              .usd &&
                              market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {market_data.price_change_percentage_30d_in_currency
                              .usd &&
                              market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>{" "}
                      <td>
                        {market_data.price_change_percentage_1y_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {market_data.price_change_percentage_1y_in_currency
                              .usd &&
                              market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {market_data.price_change_percentage_1y_in_currency
                              .usd &&
                              market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                                2
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabIndex="0"
            >
              <Market
                coin={coin}
                id={id}
                name={name}
                symbol={symbol}
                tickers={tickers}
              />
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
              tabIndex="0"
            >
              Coiming Soon
            </div>
            <div
              className="tab-pane fade"
              id="nav-converter"
              role="tabpanel"
              aria-labelledby="nav-converter-tab"
              tabIndex="0"
            >
              <Converter
                id={coin?.id}
                name={name}
                symbol={symbol}
                market_data={market_data}
                market_cap_rank={market_cap_rank}
                coinPriceChart={coinPriceChart}
                coin={coin}
              />
            </div>
          </div>
        </div>

        {/* price Statistics */}
        <h1 id="Overview"></h1>
        <div className="col30 coin_id_market_details">
          <header> {name} Price Statistics</header>
          <hr />
          <h6>{name} Price Today</h6>
          <p>
            <span> {name} Price</span> $
            {market_data.current_price.usd
              ? market_data.current_price.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> 24h Low</span> $
            {market_data.low_24h.usd
              ? market_data.low_24h.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> 24h High </span> $
            {market_data.high_24h.usd
              ? market_data.high_24h.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Trading Volume</span> $
            {market_data.total_volume.usd
              ? market_data.total_volume.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Market Cap Rank</span>{" "}
            {market_cap_rank ? market_cap_rank : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Market Cap</span> $
            {market_data.market_cap.usd
              ? market_data.market_cap.usd.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> All Time High</span> $
            {market_data.ath.usd
              ? market_data.ath.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> All Time High Percent</span>
            {market_data.ath_change_percentage.usd < 0 ? (
              <span className="red ath">
                {market_data.ath_change_percentage.usd
                  .toFixed(1)
                  .toLocaleString()}
                %
              </span>
            ) : (
              <span className="green ath">
                {market_data.ath_change_percentage.usd
                  .toFixed(1)
                  .toLocaleString()}
                %
              </span>
            )}
          </p>
          <p>
            <span> All Time Low</span> $
            {market_data.ath.usd
              ? market_data.atl.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> All Time Low Percent</span>{" "}
            {market_data.atl_change_percentage.usd < 0 ? (
              <span className="red atl">
                {market_data.atl_change_percentage.usd
                  .toFixed(1)
                  .toLocaleString()}
                %
              </span>
            ) : (
              <span className="green ath">
                {market_data.atl_change_percentage.usd
                  .toFixed(1)
                  .toLocaleString()}
                %
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
