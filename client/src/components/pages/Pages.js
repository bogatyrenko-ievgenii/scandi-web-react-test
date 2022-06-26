import { Routes, Route } from 'react-router-dom';
import Catalogue from '../Catalogue';
import ProductDescrPage from '../ProdDescrPage';
import Cart from '../Cart';
import ErrorIndicator from '../ErrorIndicator';

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route path="/clothes" element={<Catalogue />} />
            <Route path="/tech" element={<Catalogue />} />
            <Route path="/product" element={<ProductDescrPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorIndicator />} />
        </Routes>
    );
}

export default Pages;