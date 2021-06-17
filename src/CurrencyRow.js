import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions, 
        selectedCurrency,
        onChangeCurrency, 
        onChangeAmount,
        amount
    } = props

    //use the map function to loop through the currency options on the select 
    //then display those options within the actual select 
    //one issue I am running into is that array[0] and array[1] are the same which is causing an issue
    //with unique keys 
    return (
        <div>
            <input type='number' className='input' value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                
            </select>
        </div>
    )
}