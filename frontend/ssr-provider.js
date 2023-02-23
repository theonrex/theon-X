import { useState, useEffect } from "react";
import fetch from "unfetch";

export const SSRProvider = ({ children }) => {
  const [data, setData] = useState(window.__NEXT_DATA__ || {});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${window.location.origin}${window.location.pathname}`
      );
      const json = await res.json();

      setData(json);
    };

    if (!window.__NEXT_DATA__) {
      fetchData();
    }
  }, []);

  return children(data);
};
