import './Actions.scss';
import arrow from './Icons/arrow.svg';
import cart from './Icons/Empty Cart.svg';

const Actions = ({ current, currencies }) => {

    return (
        <div className='Actions' >
            <div className="Actions__currencies">
                {current} <img className='Actions__arrow' src={arrow} alt="v" />
            </div>
            <img className='Actions__cart' src={cart} alt="cart" />
        </div>
    );
}

export default Actions;