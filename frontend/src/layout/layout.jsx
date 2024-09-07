import React, { useState } from 'react';
import TopBar from './topbar';
import SideBar from './sidebar';
import "./layout.css";

const Layout = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isMobileActive, setIsMobileActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    const toggleMobileActive = () => {
        setIsMobileActive(!isMobileActive);
    };

    return (
        <div className="layout">
            <div className={`topbar`}>
                <TopBar
                    isActive={isActive}
                    toggleActive={toggleActive}
                    toggleMobileActive={toggleMobileActive}
                />
            </div>
            <div className="layout-content">
                <SideBar isActive={isActive} isMobileActive={isMobileActive} />
                <main className={`main-content `}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
