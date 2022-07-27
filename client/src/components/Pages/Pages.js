import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Catalogue from '../Catalogue';
import ProductDescrPage from '../ProdDescrPage';
import Cart from '../Cart';
import ErrorIndicator from '../ErrorIndicator';

const Pages = ({ activeCategory }) => {

    const setPathToCategory = () => {
        return activeCategory === 'all' ? '/' : `/${activeCategory}`;
    }

    return (
        <Routes>
            <Route path="/product" element={<ProductDescrPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path={setPathToCategory()} element={<Catalogue />} />
            <Route path="*" element={<ErrorIndicator />} />
        </Routes>
    );
}

function mapStateToProps(state) {
    return {
        activeCategory: state.activeCategory.name
    }
}

export default connect(mapStateToProps)(Pages);