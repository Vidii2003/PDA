// src/Components/Layout.jsx

import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="App">
      {/*<ParticlesComponent id="particles">*/}
        <div>
          {children}
        </div>
      {/*</ParticlesComponent>        */}
    </div>
  );
};

export default Layout;
