import Button from "./Button"

const List = ({ list, onClick }) => {
    return (
        <div>
            {list.map(country => <div key={country.name.common}>{country.name.common}
                <Button message="show" onClick={onClick} country={country.name.common} />
            </div>)}
        </div>
    )
}

export default List