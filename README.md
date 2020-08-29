## About the Template

The mern-stack-template is a template made for when I need to make a new web application. Most connections are already set up, all that's needed are some config variables. This repository does work on its own, however. <br /><br />Link is provided in the description or navigate to it <a href="https://jz-mern-stack-template.herokuapp.com/">here</a>. Note that it takes about 30 seconds to load up if left inactive for too long due to Heroku restrictions.

Creating a new repository through the template button does work. Just need to make sure to `npm install` node dependencies after cloning to local. Have not tested Heroku deployment.

## Node Dependencies to Download

This project involves many node dependecies. I will list them here: Mongoose, Express, Concurrently, Axios, Morgan, Nodemon, React-Router-Dom, Bootstrap, Reactstrap.<br /><br />
Assuming that you already have Node.js installed and everything, there are many ways to download the dependencies necessary to get it working. <br /><br />

First way is to clone this project and in your local terminal, run `npm install`. <br /><br />

Below is the code I used to install them all. This would be the second way.<br />

`npm install mongoose express concurrently axios morgan -s`<br />
`npm install -g nodemon`<br />
`npm install react-router-dom`<br />
`npm install --save bootstrap`<br />
`npm install --save reactstrap react react-dom`

## When deploying to Heroku

Make sure that you have Heroku connected to your GitHub account. This will make the process of connecting your application much easier as deployments will be through GitHub code that you push onto your repository.

## Get your config vars ready
There are only two config vars necessary to get your web app up and running completely. One is for MongoDB Atlas connection (`MONGODB_URI`) and the other is your env var for production and development (`NODE_ENV`). For the MongoDB Atlas URI, make sure you create a MongoDB atlas account, create a cluster, and there should be a button for you to connect it to your application. Make sure you follow all the steps and you should get a funky looking link to copy into the config vars section in Heroku. The env var has two options, "development" or "production". Usually you just keep it in production. 
<br />
# Everything below this is auto-generated from create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
