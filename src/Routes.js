import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewReport from "./containers/NewReport";
import Reports from "./containers/Reports";
import ChangePassword from "./containers/ChangePassword";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangeEmail from "./containers/ChangeEmail";
import NotFound from "./containers/NotFound";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/reports/new" exact component={NewReport} appProps={appProps} />
      <AppliedRoute path="/reports/:id" exact component={Reports} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AppliedRoute
        path="/settings/password"
        exact
        component={ChangePassword}
        appProps={appProps}
      />
      <AppliedRoute
        path="/settings/email"
        exact
        component={ChangeEmail}
        props={appProps}
      />
      <UnauthenticatedRoute
        path="/login/reset"
        exact
        component={ResetPassword}
        appProps={appProps}
      />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}