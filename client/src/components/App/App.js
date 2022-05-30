import React from "react";
import Layout from "../../Layout";
import Header from "../Header";
import Catalogue from "../Catalogue/Catalogue";
import Pdp from "../ProdDescrPage/Pdp";

import { Routes, Route } from 'react-router-dom'


function App() {
    return <div className="App">
        {/* <React.StrictMode> */}
        <Layout>
            <Header />
            <Routes>
                <Route path="/" element={<Catalogue />} />
                <Route path="/clothes" element={<Catalogue />} />
                <Route path="/tech" element={<Catalogue />} />
                <Route path="/product" element={<Pdp />} />
            </Routes>
        </Layout>
        {/* </React.StrictMode> */}
    </div>;
}

export default App;
