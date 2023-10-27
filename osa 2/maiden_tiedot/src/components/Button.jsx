const Button = ({ message, onClick, country }) =>
    <button onClick={() => onClick(country)}>{message}</button>


export default Button