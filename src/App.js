import React from "react";
import './App.css';
import SignIn from '../src/Signin/SignIn';
import DateFnsUtils from '@date-io/date-fns';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from '@material-ui/styles';
import Clients from './Pages/Clients/Clients';
import Loans from './Pages/Loans/Loans';
import {useTheme} from './theme';
import { configureStore } from "@reduxjs/toolkit";
import Lines from './Pages/Lines/Lines';
import { Provider } from 'react-redux';
import loanReducer from '../src/Pages/Loans/LoansSlice';
import clientsReducer from '../src/Pages/Clients/ClientSlice';
import ClientDetail from './Pages/Clients/ClientDetail';
import Configuration from './Pages/Configuration/Configuration';
import linesReducer from '../src/Pages/Lines/LinesSlice';
import itemsReducer from '../src/Pages/Items/ItemSlice';
import Items from "./Pages/Items/Items";
import Workers from "./Pages/Workers/Workers";
import workersReducer from '../src/Pages/Workers/WorkersSlice';
import Reports from "./Pages/Reports/Reports";
import ItemDetail from "./Pages/Items/ItemDetail";
import LoansDetail from "./Pages/Loans/LoansDetail";
import LinesDetail from "./Pages/Lines/LinesDetail";
import WorkerDetail from "./Pages/Workers/WorkerDetail";

function App() {

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
      loan: loanReducer,
      lines: linesReducer,
      items: itemsReducer,
      workers: workersReducer,
    },
  });

  const [currentTheme] = useTheme();

  return (
    <>
      <MuiPickersUtilsProvider utils = {DateFnsUtils}>
        <ThemeProvider theme = {currentTheme}>
        <Provider store = {store}>
              <Router>
                <div>
                  <Switch>
                    <Route path = "https://credimarketnic.com/dashboard">
                      <Dashboard/>
                    </Route>
                    <Route path = "https://credimarketnic.com/clients">
                      <Clients/>
                    </Route>
                    <Route path = "https://credimarketnic.com/clientdetail/1">
                      <ClientDetail/>
                    </Route>
                    <Route path = "https://credimarketnic.com/loans">
                      <Loans/>
                    </Route>
                    <Route path = "https://credimarketnic.com/loandetail/1">
                      <LoansDetail/>
                    </Route>
                    <Route path = "https://credimarketnic.com/lines">
                      <Lines/>
                    </Route>
                    <Route path = "https://credimarketnic.com/linesdetail/1">
                      <LinesDetail/>
                    </Route>
                    <Route exact path = "/">
                      <SignIn/>
                    </Route>
                    <Route exact path = "https://credimarketnic.com/configuration">
                      <Configuration/>
                    </Route>
                    <Route exact path = "https://credimarketnic.com/reports">
                      <Reports/>
                    </Route>
                    <Route exact path = "https://credimarketnic.com/workers">
                      <Workers/>
                    </Route>
                    <Route path = "https://credimarketnic.com/workersdetail/1">
                      <WorkerDetail/>
                    </Route>
                    <Route exact path = "https://credimarketnic.com/items">
                      <Items/>
                    </Route>
                    <Route path = "https://credimarketnic.com/itemdetail/1">
                      <ItemDetail/>
                    </Route>
                  </Switch>
                  
                </div>
              </Router>
          </Provider>
          </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
