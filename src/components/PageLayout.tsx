
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-denim-900">{title}</h1>
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
