import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../Container';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';
import CatalogueItem from './CatalogueItem';
import { getProductsByCategory } from '../../graphql/queries/getProductsByCategory';

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
        const notAvailable = error ? <ErrorIndicator /> : null;
        const processing = loading ? <Spinner size={100} /> : null;
        const title = !(loading || error || !activeCategory.name)
            ? <h1 className='Catalogue__title'>{this.makeCapitalLetter(activeCategory.name)}</h1>
            : null;

        return (
            <main className='Catalogue'>
                <Container>
                    {notAvailable}
                    {processing}
                    {title}
                    {title && <ul className='Catalogue__list'>
                        {products.map((product, idx) => {
                            return <CatalogueItem key={product.id + idx} product={product} />
                        })}
                    </ul>}
                </Container>
            </main>
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