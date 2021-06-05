import React, { lazy, Suspense } from "react";
import './App.css';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from '@material-ui/styles';
import {useTheme} from './theme';
import { Provider } from 'react-redux';
import generateStore from "./redux";

/*function App() {

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
                    <Route path = "/loandetail/1">
                      <LoansDetail/>
                    </Route>
                    <Route path = "/lines">
                      <Lines/>
                    </Route>
                    <Route path = "/linesdetail/1">
                      <LinesDetail/>
                    </Route>
                    <Route exact path = "/">
                      <SignIn/>
                    </Route>
                    <Route exact path = "/configuration">
                      <Configuration/>
                    </Route>
                    <Route exact path = "/reports">
                      <Reports/>
                    </Route>
                    <Route exact path = "/workers">
                      <Workers/>
                    </Route>
                    <Route path = "/workersdetail/1">
                      <WorkerDetail/>
                    </Route>
                    <Route exact path = "/items">
                      <Items/>
                    </Route>
                    <Route exact path = "/expenses">
                      <Expenses/>
                    </Route>
                    <Route path = "/itemdetail/1">
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
}*/

const Layout = lazy(() => import("./components/Layout"))
const Client = lazy(()=> import("./components/Clients/Clients"))
const Home = lazy(()=> import("./components/Dashboard/Dashboard"))
const Loan = lazy(()=> import("./Pages/Loans/Loans"))
const Line = lazy(()=>import("./Pages/Lines/Lines"))
const Worker = lazy(() => import("./Pages/Workers/Workers"))
const Expense = lazy(()=> import("./Pages/Expenses/Expenses"))
const Report = lazy(()=> import("./Pages/Reports/Reports"))
const Item = lazy(()=>import("./Pages/Items/Items"))
const Configuration = lazy(()=> import("./Pages/Configuration/Configuration"))



function App() {

    const store = generateStore();

    const [currentTheme] = useTheme();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={currentTheme}>
                <Provider store={store}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                      <Router>
                          <Route exact path="/" index = {1} name="Home" component={Home}/>
                          <Route exact path="/clients" index = {2} name = "Client" component = {Client}/>
                          <Route exact path="/loans" index = {3} name = "Loan" component = {Loan}/>
                          <Route exact path="/lines" index = {4} name = "Line" component = {Line}/>
                          <Route exact path="/workers" index = {5} name = "Worker" component = {Worker}/>
                          <Route exact path="/expenses" index = {6} name = "Expense" component = {Client}/>  
                          <Route exact path="/reports" index = {7} name = "Report" component = {Client}/>
                          <Route exact path="/items" index = {8} name = "Item" component = {Client}/>
                          <Route exact path="/configuration" index = {9} name = "Configuration" component = {Client}/>
                      </Router>
                    </Suspense>
                </Provider>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    )
}

export default App;
