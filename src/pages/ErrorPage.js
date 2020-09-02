import React, {Component} from 'react';
import './ErrorPage.css';
class ErrorPage extends Component {
  render() {
    return (
      <div className="ErrorPage">
        <div className="content-container">
          <div className="component-container">
            <h1>Oops 404! Go back to where you came from!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
