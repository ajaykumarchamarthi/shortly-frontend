import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "./../../../../store/auth-context";
import classes from "./Web.module.css";

function Web() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  return (
    <div className={classes.web}>
      <ul className={classes.weboption}>
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
          <li>
            <span
              className={classes.btn}
              onClick={() => history.replace("/login")}
            >
              Login
            </span>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <span className={classes.btn} onClick={() => authCtx.logout()}>
              Logout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Web;
