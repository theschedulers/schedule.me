import React, {Component} from 'react';
import './App.css';
import HomePage from './pages/homePage';
import OtherPage from './pages/otherPage';
import BlogPage from './pages/blogPage';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        </div>
      </Router>
    );
  }
}
