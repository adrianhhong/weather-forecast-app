import { Select } from "grommet";
import { useState, useEffect } from "react";
import client from "../client";
import { ForecastBody } from "../client/types";

const defaultOptions: string[] = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
}

const Main = (): JSX.Element => {
  // const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [forecast, setForecast] = useState<ForecastBody>({} as ForecastBody);
  const [value, setValue] = useState("medium");
  const [options, setOptions] = useState(defaultOptions);

  // Get forecast
  const getForecast = async () => {
    // setIsLoadingCart(true);
    const newForecast = await client.getForecast();
    if (newForecast != null) {
      setForecast(newForecast);
    }
    console.log(newForecast);
    // setIsLoadingCart(false);
  };

  // Get forecast on mount
  useEffect(() => {
    (async function forecastGetter() {
      getForecast();
    })();
  }, []);

  return (
    <>
      <h1>Weather Forecast App</h1>
      <Select
        options={options}
        value={value}
        onChange={({ option }) => setValue(option)}
        onClose={() => setOptions(defaultOptions)}
        onSearch={(text) => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, "i");
          setOptions(defaultOptions.filter((o) => exp.test(o)));
        }}
      />
      <h2>{forecast && forecast?.current?.feelslike_c}</h2>
    </>
  );
};

export default Main;
