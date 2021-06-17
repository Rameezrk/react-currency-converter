//import react itself and also useEffect which allows me to run a function to fetch the API data
import React, { useEffect, useState } from 'react';
import './App.css';

//I created this js file so that I have a something that outputs the conversion 
import CurrencyRow from './CurrencyRow'


//this is the api that has the latest currency conversions
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/GBP'



function App() {
  
  //useState() hook is being used here and its letting me add react state to these function components 
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  //console.log(exchangeRate)

  //console.log(currencyOptions)


  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  //implement useEffect here to fetch the API data and display it
  //the reason I used promises instead of async await is because its such a small app its not necessary
  //and doesn't interrupt the function at any given time 
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[1]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])

        //this calls the data for me to check
        //console.log(data)
      })
  }, [])


  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
    
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(event) {
    setAmount(event.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        //pass in the currencyOptions as a prop
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={event => setFromCurrency(event.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount ={fromAmount}
        />
      <div className= 'equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={event => setToCurrency(event.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        />
    </>
  );
}

export default App;
