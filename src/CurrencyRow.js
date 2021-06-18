import React from 'react'

//creates a default function that gets exported to the App.js as the CurrencyRow
export default function CurrencyRow(props) {
   //
    const {
        currencyOptions, 
        selectedCurrency,
        onChangeCurrency, 
        onChangeAmount,
        amount, 
        options
    } = props

    //use the map function to loop through the currency options on the select 
    //then display those options within the actual select 
    //one issue I am running into is that array[0] and array[1] are the same which is causing an issue
    //with unique keys 

    console.log(currencyOptions)
    return (
        <div>
            <input type='number' className='input' value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                
            {options.map((option, idx) => {
            return (
              <option key={idx} value={option.code}>
                {option.displayValue}
              </option>
            );
                    })}
                
            </select>
        </div>
    )
}