import React from "react";
import Head from "next/head";

export default class BarChart extends React.Component {
  componentDidMount() {
    const { coin } = this.props; // Get coin prop from component props
    const isDarkTheme = document.body.classList.contains("dark"); // check if body class contains "dark"

    const widget = new TradingView.widget({
      container_id: "tv-chart-container",
      autosize: true,
      symbol: `COINBASE:${coin.symbol}USD`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: isDarkTheme ? "dark" : "light", // set theme based on body class
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: true,
      allow_symbol_change: true,
      details: false,
      studies: ["MA@tv-basicstudies"],
      show_popup_button: false,
      popup_width: "100",
      popup_height: "650",
    });
  }

  render() {
    return (
      <div>
        <Head>
          <script
            type="text/javascript"
            src="https://s3.tradingview.com/tv.js"
          ></script>
        </Head>

        <div id="tv-chart-container"></div>
      </div>
    );
  }
}
