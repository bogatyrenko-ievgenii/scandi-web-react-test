import React from "react";
import Layout from "../Layout";
import Header from "./Header";

import './App.scss';

function App() {
    return <div className="App">
        <React.StrictMode>
            <Layout>
                <Header />
            </Layout>
        </React.StrictMode>
    </div>;
}

export default App;
