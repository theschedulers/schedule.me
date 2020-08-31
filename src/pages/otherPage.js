import React, {Component} from 'react';
import {Button} from 'reactstrap';
// import {response} from 'express';
const axios = require('axios');

export default class OtherPage extends Component {
  //creating sessions
  onCreate = () => {
    var x =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    console.log(x);
    var name, user_id;
    name = 'Justin';
    user_id =
      window.gapi.auth2.getAuthInstance().currentUser.get().Da + ', 9128372193';
    var emails =
      window.gapi.auth2.getAuthInstance().currentUser.get().rt.$t +
      ', test@gmail.com';

    console.log(name, user_id, emails);

    const payload = {
      session_id: x,
      emails: emails,
      user_ids: user_id,
    };
    axios({url: '/api/session/save', method: 'POST', data: payload})
      .then(() => {
        console.log('data SENT!');
        // this.setState({title: '', body: ''});
        this.onRead();
      })
      .catch(() => {
        console.log('error');
      });
  };

  //Read data and render
  onRead = () => {
    axios
      .get('/api/session/read')
      .then((response) => {
        const data = response.data;
        console.log('User Data retrieved: ', response.data);
        // this.setState({ users: data });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  onUpdate = () => {
    var x =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    let payload = {session_id: x};
    axios
      .post('/api/session/update', payload)
      .then((response) => {
        console.log('Saved: ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDelete = () => {
    var x = 'ye';
    let payload = {session_id: x};
    axios
      .post('/api/session/delete', payload)
      .then((response) => {
        console.log('Saved: ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Button onClick={this.onCreate}>Create</Button>
        <Button onClick={this.onRead}>Read</Button>
        <Button onClick={this.onUpdate}>Update</Button>
        <Button onClick={this.onDelete}>Delete</Button>
      </div>
    );
  }
}
