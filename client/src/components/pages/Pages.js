import { Routes, Route } from 'react-router-dom';
import Catalogue from '../Catalogue';
import ProductDescrPage from '../ProdDescrPage';

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route path="/clothes" element={<Catalogue />} />
            <Route path="/tech" element={<Catalogue />} />
            <Route path="/product" element={<ProductDescrPage />} />
        </Routes>
    );
}

export default Pages;