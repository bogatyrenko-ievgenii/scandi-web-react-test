import { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

import Container from '../Container';
import BagItem from '../BagItem';

import './Cart.scss';

class Cart extends PureComponent {
    render() {
        return (
            <section className='Cart'>
                <Container>
                    <h2 className='Cart__title'>Cart</h2>
                    <div className='Cart__decorLine'></div>

                </Container>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.items
    }
}

export default connect(mapStateToProps, actions)(Cart);