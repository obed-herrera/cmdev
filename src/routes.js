import React, { lazy } from 'react'

const Home = lazy(() => import('./Components/Dashboard/Dashboard'))
const SignIn = lazy(() => import('./Pages/SignIn'))
const NotFound = lazy(() => import('./Pages/NotFound'))

const routes = [
    {
        path: '/',
        exact: true,
        name: 'Home',
        component: Home,
    },
    {
        path: '/sign-in',
        exact: true,
        name: 'SignIn',
        component: SignIn,
    },
    {
        component: NotFound
    }
]

export default routes
