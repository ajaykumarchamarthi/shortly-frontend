import React from "react";
import { useHistory } from "react-router-dom";
import Web from "./Web/Web";
import "./Header.css";

function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <h3 className="logo" onClick={() => history.replace("/")}>
        Shortly
      </h3>
      <div className="menu">
        <div className="web-menu">
          <Web />
        </div>
      </div>
    </div>
  );
}

export default Header;
