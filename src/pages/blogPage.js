import React, { Component } from 'react';
import BlogForm from '../components/blogForm';
import { Button, Card, CardTitle, CardText, Jumbotron } from 'reactstrap';
import './blogPage.css';
const axios = require('axios');

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: [],
    };
  }

  componentDidMount = () => {
    this.getBlogPosts();
  };

  getBlogPosts = () => {
    axios
      .get('/api')
      .then((response) => {
        const data = response.data;
        console.log('Data retrieved: ', response.data);
        this.setState({ posts: data });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  checkConsole = () => {
    console.log('------------ Submit ------------');
    console.log('title:', this.state.submittedTitle);
    console.log('Data: ', this.state.submittedBody);
  };

  updateTitle = (e) => {
    // console.log("update title", e);
    this.setState({ title: e });
  };

  updateBody = (e) => {
    // console.log("update data", e);
    this.setState({ body: e });
  };

  isFilled = () => {
    return this.state.title !== '' && this.state.body !== '';
  };

  handleData = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body,
    };
    axios({ url: '/api/save', method: 'POST', data: payload })
      .then(() => {
        console.log('data SENT!');
        this.setState({ title: '', body: '' });
        this.getBlogPosts();
      })
      .catch(() => {
        console.log('error');
      });
  };

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
            This is my only somewhat complete page on the website!
          </p>
          <hr className="my-2" />
          <p>
            I was able to do some MERN stack magic to make this blog post page.
            Leave a comment below (if you feel like it) :)
          </p>
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
