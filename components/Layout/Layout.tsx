import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
