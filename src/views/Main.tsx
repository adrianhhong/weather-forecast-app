import { useState, useEffect } from "react";
import client from "../client";

const Main = (): JSX.Element => {
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [cart, setCart] = useState({});

  // Get forecast
  const getForecast = async () => {
    setIsLoadingCart(true);
    const newCart = await client.getForecast();
    if (newCart != null) {
      setCart(newCart);
    }
    setIsLoadingCart(false);
  };

  // Get forecast on mount
  useEffect(() => {
    (async function forecastGetter() {
      getForecast();
      console.log(cart);
    })();
  }, []);

  return <></>;
};

export default Main;
