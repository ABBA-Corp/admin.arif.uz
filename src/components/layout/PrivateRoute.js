import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, path = '/', exact = false }) => {
    const token = JSON.parse(window.localStorage.getItem('arif_admin_token'));
    if (!token) return <Redirect to={'/login'} />;
    return <Route component={component} path={path} exact={exact} />;
};

export default PrivateRoute;
