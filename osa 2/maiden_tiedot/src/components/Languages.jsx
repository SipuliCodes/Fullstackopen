const Languages = ({ country }) => {
    return (
        <div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, language]) => {
                    return (
                        <li key={key}>{language}</li>
                    )
                })}
            </ul>
        </div>

    )
}

export default Languages