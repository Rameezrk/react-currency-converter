import { useCallback, useEffect, useState } from "react";

export const RATES_URL = "https://api.exchangerate-api.com/v4/latest/";
export const CURRENCIES_URL =
  "https://openexchangerates.org/api/currencies.json";

function App() {
  const [baseRate, setBaseRate] = useState("GBP");
  const [rates, setRates] = useState([]);
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("GBP");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [reverse, setReverse] = useState(false);

  const getRates = useCallback(async (rate = "GBP") => {
    const ratesRes = await fetch(RATES_URL + rate);
    const ratesJSON = await ratesRes.json();
    setBaseRate(ratesJSON.base);
    setRates(ratesJSON.rates);

    const currenciesRes = await fetch(CURRENCIES_URL);
    const currenciesJSON = await currenciesRes.json();

    const options = Object.keys(ratesJSON.rates).map((rate) => {
      const displayValue = currenciesJSON[rate];
      const code = rate;
      return {
        code,
        displayValue
      };
    });

    setOptions(options);
  }, []);

  const onFromChange = (e) => {
    const { value } = e.target;
    setFrom(value);

    if (!reverse) {
      setBaseRate(value);
    }
  };

  const onToChange = (e) => {
    const { value } = e.target;
    setTo(value);

    if (reverse) {
      setBaseRate(value);
    }
  };

  const onClick = () => {
    setReverse(!reverse);
  };

  useEffect(() => {
    getRates();
  }, [getRates]);

  useEffect(() => {
    if (amount) {
      const num = parseFloat(amount);
      const toRate = rates[to];

      let message = `${num} ${from} = ${num * toRate} ${to}`;
      if (reverse) {
        message = `${num * toRate} ${to} = ${num} ${from}`;
      }

      setMessage(message);
    }
  }, [from, to, amount, baseRate, rates, reverse]);

  useEffect(() => {
    getRates(baseRate);
  }, [baseRate, getRates]);

  return (
    <div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="from-select">From Currency:</label>
        <select value={from} name="from" onChange={onFromChange}>
          {options.map((option, idx) => {
            return (
              <option key={idx} value={option.code}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="to-select">To Currency:</label>
        <select value={to} name="to" onChange={onToChange}>
          {options.map((option, idx) => {
            return (
              <option key={idx} value={option.code}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button name="reverse" onClick={onClick}>
          Reverse
        </button>
      </div>
      {message ? <div>{message}</div> : null}
    </div>
  );
}

export default App;
