// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen min-w-full">
            <Navbar />
            <main className="flex-grow flex w-full min-h-full bg-white">{children}</main>
        </div>
    );
};

export default MainLayout;
