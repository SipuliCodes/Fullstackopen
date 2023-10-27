const ShowWeather = ({ weather, country }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    const alt = weather.weather[0].description

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div>
                temperature {weather.main["temp"]} Celsius
                <br/>
                <img src={iconUrl} alt={alt} />
                <br/>
                wind {weather.wind.speed} m/s
            </div>
        </div>
    )
}

export default ShowWeather