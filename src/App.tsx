import React from 'react';
import './index.css';
import Navigation from './Navigation';
import FooterBar from './Footer';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import PlayListPage from './PlaylistPage';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return <Layout>
        <Layout>
            <Provider store={store}>
                <Navigation />
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/playlist/:id" element={<PlayListPage />} />
                </Routes>
            </Provider>
        </Layout>
        <FooterBar />
    </Layout>;
};

export default App;
