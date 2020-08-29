import React, {Component} from 'react';
import './App.css';
import HomePage from './pages/homePage';
import OtherPage from './pages/otherPage';
import BlogPage from './pages/blogPage';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Button} from 'reactstrap';
// import {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} from './config/config.json';

export default class App extends Component {
  //stores your state components (kind of like variables)
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isSignedIn: null,
    };
  }

  //Load gapi and start initialization process right when site loads
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      this.initializeGapi();
    });
  }

  //gapi initialization and log in check. Google listener set up to determine if authorization is set up.
  //If anything changes to the isSignedIn listener, this.handleAuthChange will be executed.
  initializeGapi = () => {
    window.gapi.client
      .init({
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        discoveryDocs: [process.env.DISCOVERY_DOCS],
        scope: process.env.SCOPES,
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        console.log('Auth: ', this.auth.isSignedIn.get());
        console.log('Profile: ', this.auth.currentUser.get());

        this.handleAuthChange();
        this.auth.isSignedIn.listen(this.handleAuthChange);
      });
  };

  //Run when there is change in sign in / sign out boolean. If this function is run when user is signed in,
  //Change the state of the name (usually blank, to the name of the account) and make the container div
  //holding the name "name-div" appear. Regardless of sign in or sign out, the isSignedIn state variable
  //will change accordingly. There is a listener that waits for change in this variable to render the buttons.
  handleAuthChange = () => {
    if (this.auth.isSignedIn.get()) {
      this.setState({name: this.auth.currentUser.get().rt.Ad});
      document.getElementById('name-div').style.display = 'block';
    }
    this.setState({isSignedIn: this.auth.isSignedIn.get()});
  };

  //Used in the render. This is the listener sorta that waits for isSignedIn State variable to change.
  //Once it changes the logic in the function to return the buttons accordingly (login view, logout view)
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        //signed in, so render an add event button and sign out button
        //visualize is a css descriptor to make the solid white boxes appear (in App.css)
        <div className="visualize">
          <Button color="primary" onClick={this.handleAddEvent}>
            Add Event
          </Button>{' '}
          <Button color="danger" onClick={this.handleSignOut}>
            Sign Out
          </Button>
        </div>
      );
    } else {
      //signed out, so render a sign in button
      return (
        <div className="visualize">
          <Button color="success" onClick={this.handleSignIn}>
            Sign In
          </Button>
        </div>
      );
    }
  }

  //Google Calendar add an event. onClick for Add Event Button
  handleAddEvent = () => {
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
      // console.log(event.htmlLink);
      window.open(event.htmlLink);
    });
  };

  //onClick for Sign Out button. this.auth is the gapi/google api. Signs user out, name on screen gets removed.
  handleSignOut = () => {
    this.auth.signOut();
    this.setState({name: ''});
    document.getElementById('name-div').style.display = 'none';
  };

  //onClick for Sign In button. this.auth is the gapi/google api. Opens the popup window to prompt user to sign in.
  handleSignIn = () => {
    this.auth.signIn();
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/other-page" exact component={OtherPage} />
            <Route path="/blog-page" exact component={BlogPage} />
          </Switch>
          <div>
            <div id="name-div" style={{display: 'none'}}>
              <h2>{this.state.name}</h2>
            </div>
            <div>{this.renderAuthButton()}</div>
          </div>
        </div>
      </Router>
    );
  }
}
