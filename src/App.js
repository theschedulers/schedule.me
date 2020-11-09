import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './routes/PrivateRoute';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} from './config/config.json';

//Main class, where all the different pages are rendered
export default function App(props) {
  //Some variables
  const [name, setName] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
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
        // console.log('Initialized');
        // console.log(auth.isSignedIn.get());
        auth = window.gapi.auth2.getAuthInstance();

        if (auth.isSignedIn.get()) {
          setName(auth.currentUser.get().rt.Ad);
          setIsAuthenticated(true);
          setIsInitialized(true);
        } else {
          setName('Login');
          setIsAuthenticated(false);
          setIsInitialized(true);
        }
      });
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            authenticated={isAuthenticated}
            initialized={isInitialized}
          />
          <Route component={ErrorPage} />
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
