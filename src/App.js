import React, {useState, useEffect} from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} from './config/config.json';

export default function App(props) {
  const [name, setName] = useState();
  const [isSignedIn, setIsSignedIn] = useState();
  var auth = undefined;

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      initializeGapi();
    });
  }, []);

  function initializeGapi() {
    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: [process.env.REACT_APP_DISCOVERY_DOCS],
        scope: process.env.REACT_APP_SCOPES,
        // apiKey: API_KEY,
        // clientId: CLIENT_ID,
        // discoveryDocs: [DISCOVERY_DOCS],
        // scope: SCOPES,
      })
      .then(() => {
        console.log('Initialized');
        auth = window.gapi.auth2.getAuthInstance();
        console.log(auth.isSignedIn.get());
        // setIsSignedIn({});
        // console.log(isSignedIn);
        if (auth.isSignedIn.get()) {
          setName(auth.currentUser.get().rt.Ad);
        } else {
          setName('Login');
        }
      });
  }

  return (
    <Router>
      <div>
        <Navbar loginStatus="Login" name={name} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/other-page" exact component={OtherPage} />
          <Route path="/blog-page" exact component={BlogPage} />
          <Route path={'/login'} exact component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}
