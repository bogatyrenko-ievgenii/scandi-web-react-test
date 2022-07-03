import React from "react";

import Layout from "../Layout";
import Header from "../Header";
import Pages from "../Pages";

function App() {
    return <div className="App">
        <React.StrictMode>
            <Layout>
                <Header />
                <Pages />
            </Layout>
        </React.StrictMode>
    </div>;
}

export default App;
