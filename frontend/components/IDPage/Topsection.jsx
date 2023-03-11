import React from 'react'
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

export default function Topsection({
  coin,
  name,
  symbol,
  market_data,
  market_cap_rank,
  categories,
  image,
  links,
}) {
  return (
    <div className="container">
      <div className="coinPageId rowx">
        <header className="coinId_Header">
          <Link href="/coins">
            <span className="idCoinName"> Coins</span>
          </Link>
          <i className="bi bi-chevron-right"></i>{" "}
          <p className="id_Coin_price">{symbol} price</p>
        </header>
        <div className="col70">
          <div className="coinId_Price_rank">
            <h6>
              Rank <span># </span> {market_cap_rank}{" "}
            </h6>
            <p> {categories} </p>
          </div>

          <div className="coinId_Price">
            <img src={image} alt="coin" />
            <h1 className="">{name}</h1>
          </div>
          <div className="coin_Id_price">
            <h1 className="">
              $
              {market_data.current_price.usd?.toLocaleString({
                maximumFractionDigits: 5,
              }) < 10
                ? market_data.current_price.usd
                : market_data.current_price.usd?.toLocaleString()}
            </h1>
            <p>
              {market_data.price_change_percentage_1h_in_currency?.usd < 0 ? (
                <span className="red_id ">
                  {market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
                    2
                  )}
                  % <i className="bi bi-caret-down-fill"></i>{" "}
                </span>
              ) : (
                <span className="green_id">
                  {market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
                    2
                  )}
                  % <i className="bi bi-caret-up-fill"></i>{" "}
                </span>
              )}
            </p>
          </div>

          <div className="Information">
            <div>
              <ul className="id_media_coin_first">
                <a href={links.homepage[0]}>
                  <li> Official Website </li>
                </a>
                <a href={links.repos_url.github[0]}>
                  <li>
                    {" "}
                    {links.repos_url.github[0]
                      ? links.repos_url.github[0]
                      : "GitHub Link"}{" "}
                  </li>
                </a>
                {/* <a href={links.homepage[0]}>
                  <li> Search on</li>
                </a> */}
              </ul>{" "}
              <ul className="id_media_coin ">
                <li>
                  <Dropdown className="btn_first_child">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Explorers
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={links.blockchain_site[0]}>
                        {name} link (1)
                      </Dropdown.Item>
                      <Dropdown.Item href={links.blockchain_site[1]}>
                        {" "}
                        {name} link (2)
                      </Dropdown.Item>
                      <Dropdown.Item href={links.blockchain_site[2]}>
                        {" "}
                        {name} link (2)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Community
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={links.blockchain_site[0]}>
                        {name} community (1)
                      </Dropdown.Item>
                      <Dropdown.Item href={links.blockchain_site[1]}>
                        {" "}
                        {name} community (2)
                      </Dropdown.Item>
                      <Dropdown.Item href={links.blockchain_site[2]}>
                        {name} community (3)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col30 coin_id_market_details">
          <p>
            <span> Total Volume</span>{" "}
            {market_data.total_volume.usd
              ? market_data.total_volume.usd?.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> Market Cap</span>{" "}
            {market_data.market_cap.usd
              ? market_data.market_cap.usd?.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> Fully Diluted Valuation</span>{" "}
            {market_data.fully_diluted_valuation.usd
              ? market_data.fully_diluted_valuation.usd?.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> Total Supply</span>{" "}
            {market_data.total_supply
              ? market_data.total_supply?.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> Max Supply</span>{" "}
            {market_data.max_supply
              ? market_data.max_supply?.toLocaleString()
              : "unavailable"}
          </p>

          <p>
            <span> Circulating Supply</span>{" "}
            {market_data.circulating_supply
              ? market_data.circulating_supply?.toLocaleString()
              : "unavailable"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
