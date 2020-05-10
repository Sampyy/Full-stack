import React, { useState } from 'react'
import Country from './Country'


const CountryList = ({ filteredCountries}) => {


    const setShow = (props) => props.show = !props.show
    

    if (filteredCountries.length > 10) {
        console.log('käyääks tääl')
        console.log('filtered' ,filteredCountries)
        return (<p>Too many countries</p>)
    } else {

    return(
    <div>
        <ul>
            {filteredCountries.map(country =>  {
                console.log(country)
                return(
                <Country 
                    key={country.name} 
                    name={country.name} 
                    filterSize={filteredCountries.length} 
                    capital={country.capital} 
                    pop={country.population} 
                    lang={country.languages} 
                    flag={country.flag} 
                />
                )
            })}
        </ul>
    </div>
    )}
}

export default CountryList