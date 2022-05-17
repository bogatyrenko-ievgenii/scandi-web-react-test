import './Currencies.scss'

const Currencies = ({ currencies, current, change, close }) => {

    const handleClick = (value) => {
        change(value);
        close();
    }


    return (
        <ul className='Currencies'>
            {currencies.map((currency, idx) => {
                let active = current === currency.symbol ? 'active' : '';
                return <li key={idx}
                    onClick={() => handleClick(currency.symbol)}
                    className={`Currencies__item ${active}`}
                >{currency.symbol} {currency.label}
                </li>
            })}
        </ul>
    )
}


export default Currencies;