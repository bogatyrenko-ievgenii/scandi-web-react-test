import { PureComponent } from 'react';
import CurrenciesItem from './CurrenciesItem';
import { PropTypes } from 'prop-types';

import './Actions.scss';
import arrow from './Icons/arrow.svg';
import cart from './Icons/Empty Cart.svg';

class Actions extends PureComponent {

    state = {
        open: false
    }



    openSelect = () => {
        this.setState(({ open }) => ({
            open: !open
        }))
    }

    render() {
        const { current, currencies, change } = this.props;
        const { open } = this.state;

        return (
            <>
                <div className='Actions' >
                    <div onClick={this.openSelect} className="Actions__currencies">
                        {current} <img className='Actions__arrow' src={arrow} alt="v" />
                    </div>
                    <div className='Actions__cart'><img className='Actions__image' src={cart} alt="cart" />
                        <span className='Actions__qty'>3</span></div>
                </div>
                {open && <div onClick={this.openSelect} className="backDrop"></div>}
                <ul className='Currencies'>
                    {currencies.map((currency, idx) => {
                        return open
                            ? <CurrenciesItem key={idx} currency={currency}
                                change={change} close={this.openSelect} />
                            : null;
                    })}
                </ul>
            </>
        );
    }
}

Actions.propTypes = {
    current: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
}
export default Actions;