// TradingViewWidget.jsx

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Market({ tickers }) {
  const [idNumber, setIdNumber] = useState();
  const numbers = tickers.map((item, index) => {
    return { id: index + 1, trade_url: item.trade_url };
  });

  const newTickersArray = tickers.map((obj, index) => ({
    ...obj,
    id: index + 1,
  }));

  // console.log(tickers);

  return (
    <div className="container tickers">
      <table>
        <tbody>
          <tr className="table_tr_id">
            <th className="tickers_Id">#</th>
            <th className="tickers_Exchange">Exchange</th>
            <th className="tickers_Pair">Pair</th>
            <th className="tickers_Price ">Price</th>
            <th className="tickers_Volume">Volume</th>
            <th className="tickers_Url">Link</th>
            <th className="tickers_Trust_score">Trust Score</th>
          </tr>

          {newTickersArray &&
            newTickersArray.map((ticker, index) => {
              return (
                <tr key={index} className="tickers_tr">
                  <td className="tickers_Id"> {ticker.id}</td>
                  <td className="tickers_Exchange">
                    <Link
                      href={`${ticker.trade_url}`}
                      target="_blank"
                      passHref
                      rel="noopener noreferrer"
                    >
                      {ticker.market.name}
                    </Link>{" "}
                  </td>
                  <td className="tickers_Pair">
                    {(typeof ticker.base === "string" &&
                      ticker.base.includes("0x")) ||
                    ticker.base.includes("0X")
                      ? ticker.coin_id
                      : ticker.base}
                    /
                    {(typeof ticker.target === "string" &&
                      ticker.base.includes("0x")) ||
                    ticker.base.includes("0X")
                      ? ticker.target_coin_id
                      : ticker.target}
                  </td>
                  <td className="tickers_Price">
                    {" "}
                    {ticker.converted_last.usd
                      ? ticker.converted_last.usd?.toLocaleString()
                      : null}{" "}
                  </td>
                  <td className="tickers_Volume">
                    {ticker.volume
                      ? ticker.volume.toLocaleString("en-US", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })
                      : null}
                  </td>
                  <td className="tickers_Url">
                    {" "}
                    <Link
                      href={`${ticker.trade_url}`}
                      target="_blank"
                      passHref
                      rel="noopener noreferrer"
                    >
                      Trade Now
                    </Link>{" "}
                  </td>
                  <td className="tickers_Trust_score">
                    {" "}
                    {
                      (ticker.trust_score = "green" ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABR0lEQVR4nO2WTU7DMBCF3yVY8FdxBKRmJqg3QALENYA2nIUdFYgFS/YFbkJoNQ5wgxJ2FIFsUn6EcJzEhi76pJEibz695/FMgLlmTtJuQVEPwtcQTiH8VFRanHUxilb9AR82liHUh9AEil+tJfwCxRfI4rVm0Ix3oSgvBf4oeoSKd+pBVXxYOKgI/eqekupOpQH0G9zV+ZBX6sVrif2+s+QQMZ35g37USfmTceneypHTxCRpcZsEcDu97wOLY74KBlY0sDkeBXSc2sB5QMf5f4HHFjDfBoz6ZgabS7gbzjHt/Q7W+zTEAFH0bB8g7w12GsDtMZwWv9mnHrv5rr0IJ2XRppfI9VqUaNsN+hl54uFHoFcNOpVe4rVipzGEttBIw/UFCB+ZznSKls7d79RF+jno1SZ8aaaQGa+UF98DSLRf/mTmwt/rDToYyY3gOA4cAAAAAElFTkSuQmCC" />
                      ) : (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMElEQVR4nO2WQU4CQRBF3yVciEq4jokYr6HAeBZ3GggLl+5Rb+IAqR70BjjuxGg66UkIkZ6ame7Agp9UMunNy/9dXTVw0L5JoG1gIPAqkAp8uUrdWX8OZ8GAH3Ai8CCwMvDrK4EfA08ZdBpBM7gykJcB/6lPA5e1oAZunYOq0HX3SWWn0gC6Adc5n8FpzXi3xv4OLU3E44DQooalT0bTvTUiX9kkfW6TCG4LeM/n+CUW2MDE53ge0XHqA4fs5s3KdwVe+sDTiFG/7V9zCfQjOr7eCrb7NMYAMfDtHSDunkcR3N6jWfxunwbr5gUco1EG5yEit2tRoKuCrkWeBPgRGFSCFrJLvGbsS4ELmmgGRwJ3tjOV0T6q71Qj+xzsahN4tlPIjdfcfU8EbkqfzEHsQH8cuWOpf5aAWAAAAABJRU5ErkJggg==" />
                      ))
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
