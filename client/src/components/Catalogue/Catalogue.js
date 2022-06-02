import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Container from '../Container';
import { getProductsByCategory } from '../../services/queries/category';
import PropTypes from 'prop-types'
import CatalogueItem from './CatalogueItem';

import './Catalogue.scss';


class Catalogue extends PureComponent {

    state = {
        loading: false,
        error: false,
        products: [],
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCategory.name !== this.props.activeCategory.name) {
            this.getData();
        }
    }

    getData = () => {
        this.setState({ loading: true })
        return getProductsByCategory(this.props.activeCategory.name)
            .then(response => {
                this.setState({
                    products: response.data.category.products,
                    loading: response.loading
                })
            }).catch(() => {
                this.setState({ error: true, loading: false })
            })
    }

    makeCapitalLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    render() {
        const { activeCategory } = this.props;
        const { error, loading, products } = this.state
        const notAvailable = error ? 'Sorry, something went wrong' : null;
        const processing = loading ? 'Loading...' : null;
        const title = !(loading || error || !activeCategory.name)
            ? <h1 className='Catalogue__title'>{this.makeCapitalLetter(activeCategory.name)}</h1>
            : null;

        return (
            <section className='Catalogue'>
                <Container>
                    {notAvailable}
                    {processing}
                    {title}
                    {title && <ul className='Catalogue__list'>
                        {products.map((product, idx) => {
                            return <CatalogueItem key={idx} product={product} />
                        })}
                    </ul>}
                </Container>
            </section >
        );
    }
}

Catalogue.propTypes = {
    activeCategory: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        activeCategory: state.activeCategory,
    };
}

export default connect(mapStateToProps)(Catalogue);