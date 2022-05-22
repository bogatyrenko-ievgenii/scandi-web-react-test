import React from "react";
import Layout from "../Layout";
import Header from "./Header";
import Catalogue from "./Catalogue/Catalogue";

import './App.scss';

function App() {
    return <div className="App">
        <React.StrictMode>
            <Layout>
                <Header />
                <Catalogue></Catalogue>
            </Layout>
        </React.StrictMode>
    </div>;
}

export default App;
