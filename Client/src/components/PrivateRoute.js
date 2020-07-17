import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            switch (isAuthenticated) {
                case null:
                    return (
                        <div>
                            <h1 className="mt-5 mb-5">Loading</h1>
                        </div>
                    )
                case false:
                    return <Redirect to="/signin" />
                default:
                    return <Component {...props} />
            }
        }} />
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default connect(mapStateToProps)(PrivateRoute);