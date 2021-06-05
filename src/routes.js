
import React, { lazy } from 'react'

const Home = lazy(() => import('./components/Dashboard/Dashboard'))
const SignIn = lazy(() => import('./components/Signin/SignIn'))
const Client = lazy(() => import('./components/Clients/Clients'))
const Loan = lazy(()=>import('./Pages/Loans/Loans'))
//const NotFound = lazy(() => import('./Pages/NotFound'))

const routes = [
    {
        index: 1,
        path: '/',
        exact: true,
        name: 'Home',
        component: Home,
    },
    {
        index: 2,
        path: '/clients',
        exact: true,
        name: 'Client',
        component: Client
    },
    {
        index: 3,
        path: '/signin',
        exact: true,
        name: 'SignIn',
        component: SignIn,
    },
    {
        index: 4,
        path: '/loans',
        exact: true,
        name: 'Loans',
        component: Loan
    }
    /*{
        component: NotFound
    }*/
]

export default routes