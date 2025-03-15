
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
      <main className="min-h-screen py-8 sm:py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto py-6 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold mb-4 sm:mb-6 text-denim-900">{title}</h1>
          <div className="prose prose-base sm:prose-lg max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
