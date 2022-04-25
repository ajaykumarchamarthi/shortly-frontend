import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

function Navbar() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  return (
    <div className={classes.navbar}>
      <div
        className={classes.logo}
        onCick={() => history.replace("/dashboard")}
      >
        <h3>Shortly</h3>
      </div>
      <nav>
        {authCtx.isLoggedIn && (
          <NavLink
            to="/dashboard"
            activeClassName={classes.active}
            className={classes.option}
            exact
          >
            Dashboard
          </NavLink>
        )}
        {!authCtx.isLoggedIn && (
          <button className={classes.btn}>
            <NavLink to="/signup">
              <span>Sign Up</span>
            </NavLink>
          </button>
        )}
        {authCtx.isLoggedIn && (
          <button className={classes.btn} onClick={() => authCtx.logout()}>
            <span>Log Out</span>
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
