## About the Project

A group scheduler app where users form teams and input availabilities and shifts on a team calendar!

## Getting Started

Choose how you would like to run our web application!

<b>Locally:</b> Install Node.js and make sure it's running, download the source code (master branch) from the repository, load the source code into an IDE (We used VS Code), then in your terminal at the source code file type `npm install` to install all used node dependencies. In order to actually get the Google API and MongoDB working for the application to run, you must have a working set of config variables. Obviously we won't share our config variables to the public. There is a config.example.json file that you can reference. Essentially you will need Google API client key and MongoDB Atlas cluster connections. To finally begin to run the application, use the command `npm run dev` in the terminal and make sure you have already navigated to your source code's file destination (not necessary if using VS Code's built-in terminal and you have the source code open there).

<b>Heroku:</b> Go to our site and you're ready to go! Note that our application may not support huge amounts of data transfer due to the "free of charge" level of services we use (for both MongoDB and Heroku). It should be fine if you don't have more than 3 or so members and you're not filling out the entire grid. <b>If this is your first time logging in to our site with Google, you will encounter a "This App isn't Verified" notice after clicking on your desired Google account.</b> Simply click "Advanced" and "Go to sjsu-schedule-me.herokuapp.com (unsafe)" to continue the process. This is really just here to warn users of potential threats. We (a group of university students) would not go through the trouble of creating a cool web application just to steal your information. 

## Some answers to some questions
- If you run into any errors that will not allow you to do anything, contact us. The application is buggy and needs improvements 👍
- If you cannot edit any shifts or anything on the team, it may be a payload error. The grid is very large and data transfers may not be working properly with large amounts of data (Free version of MongoDB Cloud).
- If you want to export calendars, those are not quite done yet so 😶
- Also try not to have multiple users edit things at the same time. It will work fine if you go one by one (sequentially), but may break if multiple users are editing the same data.

## When deploying to Heroku

Make sure that you have Heroku connected to your GitHub account. This will make the process of connecting your application much easier as deployments will be through GitHub code that you push onto your repository. You will also need to bring in some Heroku build packs as well. These are the names of the buildpacks utilized: `https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz` and `heroku/nodejs`.

## Get your config vars ready
There are only two config vars necessary to get your web app up and running completely. One is for MongoDB Atlas connection (`MONGODB_URI`) and the other is your env var for production and development (`NODE_ENV`). For the MongoDB Atlas URI, make sure you create a MongoDB atlas account, create a cluster, and there should be a button for you to connect it to your application. Make sure you follow all the steps and you should get a funky looking link to copy into the config vars section in Heroku. The env var has two options, "development" or "production". Usually you just keep it in production. 
<br />

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
