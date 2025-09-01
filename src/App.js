import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage    from './pages/HomePage';
import DesignPage  from './pages/DesignPage';
import GalleryPage from './pages/GalleryPage';
import OtherPage   from './pages/OtherPage';
import TopNav      from './pages/components/TopNav';

export default class App extends React.Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <TopNav />
                <div className="App-content">
                    <Routes>
                        <Route path="/"        element={<HomePage />}    />

                        <Route path="/gallery" element={<GalleryPage />} />

                        <Route path="*"        element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}
