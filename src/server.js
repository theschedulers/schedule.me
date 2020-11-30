const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//import new DB collection routes here
const BlogPostRoutes = require('./routes/BlogPost');
const TeamRoutes = require('./routes/Team');
const userRoutes = require('./routes/User');

const config = require("./config/config.json")

//Use later
//connect mongoDB with mongoose
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/template', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

//using this for now as local cloud db
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Check is mongoose is connected in your terminal
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

//Parse every single json / urlencoded coming in
//makes it so that the router can access the data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));

//Where I determine which route to put the data in (right now the data is in localhost:8080/api)
//Add new schemas and collections here
app.use('/api', BlogPostRoutes);
app.use('/api', TeamRoutes);
app.use('/api', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, console.log(`SERVER IS STARTING AT ${PORT}`));
