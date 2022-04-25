import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Authentication/Signup/Signup";
import Login from "./components/Authentication/Login/Login";
import ForgotPassword from "./components/Authentication/Forgot Password/ForgotPassword";
import ResetPassword from "./components/Authentication/Reset Password/ResetPassword";
import EmailVerification from "./components/Authentication/Email Verification/EmailVerification";

import Header from "./components/Authentication/Navbar/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthContext from "./store/auth-context";
import classes from "./App.module.css";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className={classes.App}>
        <div className={classes.wrapper}>
          <Switch>
            <Route path="/" exact>
              {authCtx.isLoggedIn ? <Dashboard /> : <Signup />}
            </Route>
            {!authCtx.isLoggedIn && (
              <Route path="/login">
                <Login />
              </Route>
            )}
            {!authCtx.isLoggedIn && (
              <Route path="/forgotpassword">
                <ForgotPassword />
              </Route>
            )}
            {!authCtx.isLoggedIn && (
              <Route path="/resetpassword/:token">
                <ResetPassword />
              </Route>
            )}
            {!authCtx.isLoggedIn && (
              <Route path="/emailverification/:emailVerificationToken">
                <EmailVerification />
              </Route>
            )}
            {!authCtx.isLoggedIn && (
              <Route path="/signup">
                <Signup />
              </Route>
            )}
            <Route path="*">
              {authCtx.isLoggedIn ? <Dashboard /> : <Signup />}
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
