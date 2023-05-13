import React from "react"
import PropTypes from 'prop-types'
import { Route, Redirect } from "react-router-dom"
import {connect} from "react-redux";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  user,
  actionsRoute,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
      if( actionsRoute?.length > 0 && !user.roles.some(a => actionsRoute?.includes(a))){
          return (
              <Redirect
                  to={{ pathname: "/not-found", state: { from: props.location } }}
              />
          )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  user: PropTypes.any,
  actionsRoute: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any
}

const mapStateToProps = state => {
    return {
        user: state.Login.user.userData,
    };
};

export default connect(mapStateToProps, null)(AppRoute)
