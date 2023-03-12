import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function BarChart({ coin }) {
  const onLoadScriptRef = useRef();
  const isDarkTheme =
    typeof window !== "undefined" && document.body.classList.contains("dark"); // check if body class contains "dark"

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        typeof window !== "undefined" &&
        document.getElementById("tradingview_c7696") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: coin,
          interval: "D",
          timezone: "Etc/UTC",
          theme: isDarkTheme ? "dark" : "light", // set theme based on body class
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_c7696",
        });
      }
    }
  }, [coin]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_c7696" />
      <div className="tradingview-widget-copyright">
        <a
          href={`https://www.tradingview.com/chart/?symbol=${coin}`}
          rel="noopener"
          target="_blank"
        >
          <span className="blue-text">{`${coin} chart`}</span>
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
}
