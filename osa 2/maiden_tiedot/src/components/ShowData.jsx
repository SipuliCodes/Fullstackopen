import Languages from "./Languages"

const ShowData = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                capital {country.capital}
                <br />
                area {country.area}
            </div>
            <Languages country={country} />
            <img src={country.flags['png']} className="flag" alt={country.flags['alt']} />
        </div>

    )
}

export default ShowData