import { Route, Redirect } from "react-router-dom";
import React from "react";

interface PrivateRouteProps{
    isLoggedIn: boolean,
    path:string,
    component: React.ComponentClass<any, any> | React.FunctionComponent<any> | undefined
}

const PrivateRoute = (privateRouteProps:PrivateRouteProps) => {
    const {isLoggedIn, path, component:Component} = privateRouteProps;

    return isLoggedIn? <Route path={path} component={Component} /> : <Redirect to='/login' />;
}

export default PrivateRoute