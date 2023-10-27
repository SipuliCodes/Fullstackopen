import { useState, useEffect } from 'react'
import Search from './components/Search'
import Info from './components/Info'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState("")
  const [filteredCountry, setFilteredCountry] = useState("")
  
  const handleCountryChange = (event) => {
    setSearchedCountry(event.target.value)
  }

  const showData = countryName => {
    const country = filteredCountries.find(country => country.name.common === countryName)
    setFilteredCountries([country])
  }

  useEffect(() => {

    if (countries.length == 0) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(searchedCountry))
      
    )
    
  
  }, [searchedCountry])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setFilteredCountry(filteredCountries[0])
    }

  }, [filteredCountries])

  useEffect(() => {
    if (filteredCountry) {
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${filteredCountry.capital},${filteredCountry.name.common}&appid=${api_key} `)
        .then(response => {
          setCapital(response.data[0])
        })
    }
  }, [filteredCountry])

  useEffect(() => {
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capital.lat}&lon=${capital.lon}&units=metric&appid=${api_key}`)
        .then(response => setWeather(response.data))
    }

  }, [capital])
  
  return (
    <div>
      <Search
        message="find countries"
        value={searchedCountry}
        onChange={handleCountryChange}
      />
      <Info countries={filteredCountries} onClick={showData} weather={weather} />
    </div>
  )
}

export default App
