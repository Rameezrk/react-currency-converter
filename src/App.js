//import the react elements to be able to use with this file 
import { useCallback, useEffect, useState } from "react";

//getting the urls and putting them into a variable to be able to use further fetch wise 
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

  //this variable gets the latest currency rates from the variable and fetches them 
  //we also get the base rate from this which is GBP 
  //the ratesJSON variable also parses the fetch information and provides it as data that we can use 
  const getRates = useCallback(async (rate = "GBP") => {
    const ratesRes = await fetch(RATES_URL + rate);
    const ratesJSON = await ratesRes.json();
    setBaseRate(ratesJSON.base);
    setRates(ratesJSON.rates);

    //this is getting the currency codes to country names that we will be using 
    //currenciesJSON also parses this information into data that we can use 
    const currenciesRes = await fetch(CURRENCIES_URL);
    const currenciesJSON = await currenciesRes.json();

    //with this we are destructuring the rates & country information
    //then we are creating our own object that we can use to display the information 
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

  //creating the variable to sort the from currency chosen 
  const onFromChange = (e) => {
    const { value } = e.target;
    setFrom(value);

    if (!reverse) {
      setBaseRate(value);
    }
  };

  //creating the variable to sort the to currency chosen 
  const onToChange = (e) => {
    const { value } = e.target;
    setTo(value);

    if (reverse) {
      setBaseRate(value);
    }
  };

  //on click for the reverse button 
  const onClick = () => {
    setReverse(!reverse);
  };

  

  useEffect(() => {
    getRates();
  }, [getRates]);

  //
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

  //this gets our rates 
  useEffect(() => {
    getRates(baseRate);
  }, [baseRate, getRates]);

  return (
    //The amount that is being entered by the user 
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
