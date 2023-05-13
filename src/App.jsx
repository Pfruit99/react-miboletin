import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Import Routes
import { authProtectedRoutes,
  publicRoutes
} from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// Import fackbackend Configuration file
import fakeBackend from "./helpers/AuthType/fakeBackend";
import AuthInitProvider from "./helpers/AuthInitProvider";

// Activating fake backend
fakeBackend();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        <Router>
          <AuthInitProvider>
            <Switch>
              {publicRoutes.map((route, idx) => (
                <AppRoute
                  path={route.path}
                  layout={NonAuthLayout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
                />
              ))}

              {authProtectedRoutes.map((route, idx) => (
                <AppRoute
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  actionsRoute={route.actionsRoute}
                  exact
                />
              ))}
              <Redirect
                to={{ pathname: "/not-found" }}
              />
              <></>
            </Switch>
          </AuthInitProvider>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

App.propTypes = {
  layout: PropTypes.object,
};

export default connect(mapStateToProps, null)(App);
