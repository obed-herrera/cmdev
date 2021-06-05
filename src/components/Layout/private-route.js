import { Route, Redirect } from 'react-router-dom'
import React from 'react'

// import services
import { isAuth } from "../../services"

const PrivateRoute = ({ component, path, exact }) => {

    const _component = isAuth() ? component : () => <Redirect to="/" />

    return (
        <>
            <Route exact={exact} path={path} component={_component} />
        </>
    )
}

export default PrivateRoute