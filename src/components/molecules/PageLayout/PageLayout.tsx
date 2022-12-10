import React from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* SideBar */}
      <SideBar />
      <section id="content" className="w-screen h-[calc(100vh-4.25rem)] mt-[4.25rem]">
        {children}
      </section>
    </>
  );
};

export default PageLayout;
