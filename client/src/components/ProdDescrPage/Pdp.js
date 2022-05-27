import { PureComponent } from 'react';
import { getProductByID } from '../../services/queries/product';
import { connect } from 'react-redux';
import { changeProdId } from '../../redux/actions';
import Container from '../Container';

import './Pdp.scss';

class Pdp extends PureComponent {

    state = {
        error: false,
        loading: false,
        product: {}
    }

    componentDidMount() {
        this.getProdToState()
    }

    getProdToState = async () => {
        this.setState({ loading: true })
        const product = await getProductByID(this.props.activeProd.id)
        if (product) {
            this.setState({
                loading: product.loading,
                product: product.data.product,
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        const { error, loading, product } = this.state;
        // console.log(this.props);
        const processing = loading ? 'This product was not found' : null;
        const notAvailable = error ? 'Error' : null;
        const showProduct = !(loading || error || !product) ? true : null;
        console.log(this.state.product.gallery);

        return (
            <section className="Pdp">
                {processing}
                {notAvailable}
                {showProduct &&
                    <Container>
                        <div className="Pdp__wrapper">
                            <ul className="Pdp__list">
                                {product.gallery.map((item) => {
                                    return <img src={item} alt={product.name} />
                                })}
                                <h3>{product.name}</h3>
                            </ul>
                        </div>
                    </Container>
                }
            </section>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
        activeProd: state.activeProd
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeProdId: (id) => dispatch(changeProdId(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pdp);