import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Container from '../Container';
import getCategory from '../../services/queries/category';
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
        this.switchCategory();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCategory.name !== this.props.activeCategory.name) {
            this.switchCategory()
        }
    }

    switchCategory = async () => {
        await this.getData();
        if (this.props.activeCategory.name !== 'all') {
            const products = this.state.products.filter((product) => {
                return product.category === this.props.activeCategory.name
                    ? product : null;
            })
            this.setState({ products: products })
        }
    }

    getData = () => {
        this.setState({ loading: true })
        return getCategory
            .then(response => {
                this.setState({
                    categoryName: response.data.category.name,
                    products: response.data.category.products,
                    loading: response.loading
                })
            }).catch((error) => {
                this.setState({ error: error, loading: false })
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
        activeCategory: state.activeCategory
    };
}

export default connect(mapStateToProps)(Catalogue);