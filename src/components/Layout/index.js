import React, { Component, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from "./private-route"
import routes from '../../routes'

const Layout = () => {
    const menu = routes.map((route, index) => {
        return route.component ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
            />
        ) : null
    })

    return (
        <Switch>
            {menu}
        </Switch>
    )
}

export default Layout
