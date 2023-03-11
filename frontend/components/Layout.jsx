import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
//children is used to display the layout exported to /pages/_app.js
function Layout({ children }) {
  return (
    <div>
      <div className="layout  dark__mode">
        <Head>
          <meta
            name="description"
            content="Welcome to Theon-X, your go-to source for all things Blockchain. Our website is designed to provide you with everything you need to stay up-to-date on the world of digital currencies, from real-time price updates to the latest news and articles."
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
          ></link>
          {/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link> */}
          <link rel="shortcut icon" href="/theonrex plain.png" />
          <title> TheonCoin Tracker</title>
        </Head>
        <header>
          <NavBar />
        </header>
        <main className="">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Layout;
