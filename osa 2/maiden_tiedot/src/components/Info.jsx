import ShowData from "./ShowData"
import ShowWeather from "./ShowWeather"
import List from "./List"

const Info = ({ countries, onClick, weather }) => {

    if (countries.length === 1) {
        if (weather.length === 0) {
            return null
        }
       
        return (
            <div>
                <ShowData country={countries[0]} />
                <ShowWeather weather={weather} country={countries[0]} />
            </div>
        )
    }
    if (countries.length <= 10) {
        return <List list={countries} onClick={onClick} />
    }
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}

export default Info
