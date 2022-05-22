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
        categoryName: '',
        products: [],
    }

    componentDidMount() {
        this.setState({ loading: true })
        getCategory
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
        const { error, loading, categoryName, products } = this.state
        const notAvailable = error ? 'Sorry, something went wrong' : null;
        const processing = loading ? 'Loading...' : null;
        const title = activeCategory.name === categoryName
            ? <h1 className='Catalogue__title'>{this.makeCapitalLetter(activeCategory.name)}</h1>
            : null;
        return (
            <div className='Catalogue'>
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
            </div >
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