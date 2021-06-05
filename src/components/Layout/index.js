import React, { Component, Suspense } from 'react'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import PrivateRoute from "./private-route"
import routes from '../../routes'

const Layout = () => {
    const menu = routes.map((route, index) => {
        return route.component ? (
                <Router>
                    <div>
                        <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                        />      
                    </div>
                </Router>   
        ) : null
    })
    return (
        <Switch>
            {menu}
        </Switch>
    )
}

export default Layout