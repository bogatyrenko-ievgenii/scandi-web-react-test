import React from "react";
import Layout from "../../Layout";
import Header from "../Header";
import Catalogue from "../Catalogue/Catalogue";

import { Routes, Route } from 'react-router-dom'


function App() {
    return <div className="App">
        <React.StrictMode>
            <Layout>
                <Header />
                <Routes>
                    <Route path="/all" element={<Catalogue />} />
                    <Route path="/clothes" element={<Catalogue />} />
                    <Route path="/tech" element={<Catalogue />} />
                </Routes>
            </Layout>
        </React.StrictMode>
    </div>;
}

export default App;
