import React, {Component} from 'react';
import BlogForm from '../components/blogForm';
import {Button, Card, CardTitle, CardText, Jumbotron} from 'reactstrap';
import './BlogPage.css';
const axios = require('axios');

//Blog Page with some database stuff
export default class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: [],
    };
  }

  //Gets blog posts right when page loads
  componentDidMount = () => {
    this.getBlogPosts();
  };

  //Uses axios to get data from a path and then saves it to a state variable
  //check api.js in routes folder to see what the path does
  getBlogPosts = () => {
    axios
      .get('/api/blog')
      .then((response) => {
        const data = response.data;
        console.log('Data retrieved: ', response.data);
        this.setState({posts: data});
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  //Used for testing
  checkConsole = () => {
    console.log('------------ Submit ------------');
    console.log('title:', this.state.submittedTitle);
    console.log('Data: ', this.state.submittedBody);
  };

  updateTitle = (e) => {
    this.setState({title: e});
  };

  updateBody = (e) => {
    this.setState({body: e});
  };

  //Used more for the button, disabled until both title and body are filled.
  isFilled = () => {
    return this.state.title !== '' && this.state.body !== '';
  };

  //Post button onClick. Sends data from form to the backend and database
  //then renders it.
  handleData = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body,
    };
    axios({url: '/api/save', method: 'POST', data: payload})
      .then(() => {
        console.log('data SENT!');
        this.setState({title: '', body: ''});
        this.getBlogPosts();
      })
      .catch(() => {
        console.log('error');
      });
  };

  //Used in the render. Displays blog posts accordingly (posts is basically a list
  //of all the posts and it makes a card for each post with Arrays.map function)
  displayBlogPosts = (posts) => {
    if (!posts.length) {
      return null;
    }
    return posts.map((post, index) => (
      <Card body key={index}>
        <CardTitle>
          <strong>{post.title}</strong>
        </CardTitle>
        <CardText>{post.body}</CardText>
      </Card>
    ));
  };

  render() {
    return (
      <div className="blogPage">
        <Jumbotron className="jumbotron-spacing">
          <h1>The Blog</h1>
          <p className="lead">
            Write about your experiences with our product here!
          </p>
          <hr className="my-2" />
          <p>We would love your feedback!</p>
        </Jumbotron>
        <div className="form-container">
          <BlogForm
            title={this.state.title}
            body={this.state.body}
            updateTitle={this.updateTitle}
            updateBody={this.updateBody}
            handleData={this.handleData}
          />
          <Button
            id="blogForm-button"
            disabled={!this.isFilled()}
            onClick={this.handleData}
          >
            Post
          </Button>
        </div>
        <div className="response-container">
          {this.displayBlogPosts(this.state.posts)}
        </div>
      </div>
    );
  }
}
