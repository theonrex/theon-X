import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Layout } from "../components";
import "../styles/main.css";
import "../styles/globals.css";
import "../styles/darkMode.css";

//auth
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { publicProvider } from "wagmi/providers/public";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>{" "}
    </SessionContextProvider>
  );
}

export default MyApp;
