import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Filter from './components/Filter'


const App = (props) => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])

    const hook = () => {
        console.log('hook')
        axios
          .get("https://restcountries.eu/rest/v2/all")
          .then(response => {
            console.log(response.data)
            setCountries(response.data)
            setFilteredCountries(response.data)
            }
          )
    }

    useEffect(hook, [])

    const handleFilter = (event) => {
        console.log('handlefilter')
        setFilter(event.target.value)
        setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())))
        console.log('countries', filteredCountries)
    }

    return (
    <div>
      <Filter value={filter} handleFilter={handleFilter} />
      <CountryList  filteredCountries={countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
    )
}

export default App