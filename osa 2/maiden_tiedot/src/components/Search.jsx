const Search = ({ value, message, onChange }) => {
    return (
        <div>
            {message}
            <input
                type="text"
                value={value}
                onChange={onChange}>
            </input>
        </div>
    )
}

export default Search