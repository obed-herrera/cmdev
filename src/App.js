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

function App() {

  const store = configureStore({
    reducer: {
      clients: clientsReducer,
      loan: loanReducer,
      lines: linesReducer,
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
                    <Route path = "/dashboard">
                      <Dashboard/>
                    </Route>
                    <Route path = "/clients">
                      <Clients/>
                    </Route>
                    <Route path = "/clientdetail/1">
                      <ClientDetail/>
                    </Route>
                    <Route path = "/loans">
                      <Loans/>
                    </Route>
                    <Route path = "/lines">
                      <Lines/>
                    </Route>
                    <Route exact path = "/">
                      <SignIn/>
                    </Route>
                    <Route exact path = "/configuration">
                      <Configuration/>
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
