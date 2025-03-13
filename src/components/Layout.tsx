
import React from 'react';
import NavbarWithMobileMenu from './NavbarWithMobileMenu';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavbarWithMobileMenu />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
