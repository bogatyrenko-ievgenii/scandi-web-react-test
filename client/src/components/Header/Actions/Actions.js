import { PureComponent } from 'react';
import CurrenciesItem from './CurrenciesItem';

import './Actions.scss';
import arrow from './Icons/arrow.svg';
import cart from './Icons/Empty Cart.svg';
import { PropTypes } from 'prop-types';

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
                    <img className='Actions__cart' src={cart} alt="cart" />
                </div>
                <ul className='Currencies'>
                    {currencies.map((currency, idx) => {
                        return open
                            ? <CurrenciesItem key={idx} currency={currency}
                                current={current} change={change} close={this.openSelect} />
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