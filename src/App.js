import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/navbar';
import {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} from './config/config.json';

//Main class, where all the different pages are rendered
export default function App(props) {
  //Some variables
  const [name, setName] = useState();
  var auth = undefined;

  //ComponentDidMount() but for function .js file
  //Loads the google api right when site loads
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      initializeGapi();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Comment out corresponding vars in init when doing heroku/local
  //REACT_APP_... vars are for heroku + Comment out the config import up top
  function initializeGapi() {
    window.gapi.client
      .init({
        // apiKey: process.env.REACT_APP_API_KEY,
        // clientId: process.env.REACT_APP_CLIENT_ID,
        // discoveryDocs: [process.env.REACT_APP_DISCOVERY_DOCS],
        // scope: process.env.REACT_APP_SCOPES,
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOCS],
        scope: SCOPES,
      })
      .then(() => {
        console.log('Initialized');
        auth = window.gapi.auth2.getAuthInstance();
        console.log(auth.isSignedIn.get());
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
        <Navbar name={name} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/other-page" exact component={OtherPage} />
          <Route path="/blog-page" exact component={BlogPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
