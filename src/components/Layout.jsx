import React from 'react';
import NavBar from './NavBar';
import CLTVisualization from './CLTVisualization';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="visualization-wrapper">
        <CLTVisualization />
      </div>
      <NavBar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;