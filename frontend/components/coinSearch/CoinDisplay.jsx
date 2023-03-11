import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Pagenations from "../pagenation/pagenation"
const CoinDisplay = () => {
  const [markets, setMarkets] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState(markets);
  const [search, setSearch] = useState("");
  // search logic

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${search}`
        );
        const marketsData = res.data;
        const filteredData = marketsData?.coins?.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCoins(filteredData);
      } else {
        setFilteredCoins([]);
      }
    };
    fetchData();
  }, [search]);

  //modal
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  //prevent auto reload form
  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

  };

  return (
    <div className="coinData_container">
      <div className="container-xxl ">
        <div className="col100">
          {values.map((v, idx) => (
            <Button
              key={idx}
              className="me-2 mb-2"
              onClick={() => handleShow(v)}
            >
              <i className="bi bi-search"></i>
              {typeof v === "string" && `below ${v.split("-")[0]}`}
            </Button>
          ))}
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                <h1 className="coin_Search_text">Search a currency</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="market_data">
                <div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      onChange={handleChange}
                      placeholder="Search Cryptocurrency"
                    />
                  </form>

                  <table>
                    <tbody>
                      <tr className="table_tr_id">
                        <th className="market_cap_rank">No</th>
                        <th className="market_cap_rank">Coin</th>
                      </tr>

                      {search &&
                        filteredCoins?.map((market, i) => {
                          return (
                            <tr target="_blank" className="market_Hover">
                              <td className="market_cap_rank">
                                <>{market.market_cap_rank}</>
                              </td>
                              <td className="coin_name_widget">
                                <Link
                                  target="_blank"
                                  passHref
                                  rel="noopener noreferrer"
                                  href={`/coins/${market.id}`}
                                  key={market.id}
                                >
                                  <div className="">
                                    <img src={market.thumb} alt="coin" />
                                  </div>
                                  <h4 className="coin_name_widget_s">
                                    {market.name}{" "}
                                  </h4>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CoinDisplay;
