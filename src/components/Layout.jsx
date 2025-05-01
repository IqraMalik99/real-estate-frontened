import React from 'react'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <ToastContainer />
        </div>
    )
}

export default Layout
