import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinPage} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;