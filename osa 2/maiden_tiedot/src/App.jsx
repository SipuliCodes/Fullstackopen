import { useState, useEffect } from 'react'
import Search from './components/Search'
import axios from 'axios'

const Button = ({ message, onClick, country }) =>
  <button onClick={() => onClick(country)}>{message}</button>

const List = ({ list, onClick }) => {
  return (
    <div>
      {list.map(country => <div key={country.name.common}>{country.name.common}
        <Button message="show" onClick={onClick} country={country.name.common} />
      </div>)}
    </div>
  )
}

const Languages = ({ country }) => {
  return (
  <div>
  <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => {
          return(
            <li key={key}>{language}</li>
          )
        })}
      </ul>
    </div>
    
  )
}

const ShowData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital}
        <br/>
        area {country.area}
      </div>
      <Languages country={country} />
      <img src={country.flags['png']} className="flag" alt={country.flags['alt']}  />
    </div>

  )
}

const Info = ({ list, onClick }) => {
  if (list.length === 1) {
    return <ShowData country={list[0]}/>
  }
  if (list.length <= 10) {
    return <List list={list} onClick={onClick} />
  }
  if (list.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

function App() {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
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
        country.name.common.toLowerCase().includes( searchedCountry ))
      
    )
  }, [searchedCountry])

  return (
    <div>
      <Search
        message="find countries"
        value={searchedCountry}
        onChange={handleCountryChange}
      />
      <Info list={filteredCountries} onClick={showData} />
    </div>
  )
}

export default App
