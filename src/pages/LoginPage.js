import React, {useState, useEffect} from 'react';
import {Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import './LoginPage.css';
import {
  CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPES,
} from '../config/config.json';

export default function LoginPage(props) {
  //Vars. useHistory is used for button redirects (logout, redirect to other page)
  const [name, setName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(null);
  var auth = undefined;
  const history = useHistory();

  //Loads google api when login page is loaded, used for calendar stuff
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      initializeGapi();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Comment out corresponding vars in init when doing heroku/local
  //REACT_APP_... vars are for heroku + Comment out the config import up top
  function initializeGapi() {
    console.log('initialize Login');
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
        auth = window.gapi.auth2.getAuthInstance();
        console.log('Auth: ', auth.isSignedIn.get());
        console.log('Profile: ', auth.currentUser.get());
        handleAuthChange();
        auth.isSignedIn.listen(handleAuthChange);
      });
  }

  //Called in initializeGapi(). When google api receives authorization that user
  //logged in, do some stuff like add name to our site, change isSignedIn var.
  function handleAuthChange() {
    if (auth.isSignedIn.get()) {
      const newName = auth.currentUser.get().rt.Ad;
      setName(newName);
      document.getElementById('name-div').style.display = 'block';
    }
    const newIsSignedIn = auth.isSignedIn.get();
    setIsSignedIn(newIsSignedIn);
  }

  //Used in render to determine which buttons to show (Sign in button or (Sign Out + Add Events buttons))
  function renderAuthButton() {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        //signed in, so render an add event button and sign out button
        //visualize is a css descriptor to make the solid white boxes appear (in App.css)
        <div className="visualize">
          <Button color="primary" onClick={handleAddEvent}>
            Add Event
          </Button>{' '}
          <Button color="danger" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      );
    } else {
      //signed out, so render a sign in button
      return (
        <div className="visualize">
          <Button
            color="success"
            className="center-button"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      );
    }
  }

  //Google Calendar add an event. onClick for Add Event Button
  function handleAddEvent() {
    console.log('Add event!');
    var event = {
      summary: 'Google I/O 2015',
      location: '800 Howard St., San Francisco, CA 94103',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2020-08-28T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2020-08-28T17:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
      attendees: [
        // {email: 'lpage@example.com'}, {email: 'sbrin@example.com'}
      ],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10},
        ],
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    request.execute((event) => {
      window.open(event.htmlLink);
    });
  }

  //onClick for Sign Out button. this.auth is the gapi/google api. Signs user out, name on screen gets removed.
  function handleSignOut() {
    auth = window.gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
      setName('');
      document.getElementById('name-div').style.display = 'none';
      redirectTo('/');
    });
  }

  //onClick for Sign In button. this.auth is the gapi/google api. Opens the popup window to prompt user to sign in.
  function handleSignIn() {
    auth = window.gapi.auth2.getAuthInstance();
    auth.signIn().then((res) => {
      console.log(res);
      redirectTo('/');
    });
  }

  //function used to redirect to other pages. path example: '/other-page'
  const redirectTo = (path) => {
    history.push(path);
    window.location.reload();
  };

  return (
    <div className="LoginPage">
      <div className="content-container">
        <div className="component-container">
          <div id="name-div" style={{display: 'none'}}>
            <h2>{name}</h2>
          </div>
          {renderAuthButton()}
        </div>
      </div>
    </div>
  );
}
