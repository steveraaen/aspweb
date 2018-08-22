const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const bodyParser = require('body-parser')
const moment = require('moment')
const app = express();
const keys = require('./keys.js');


// ------ Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// ------ Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

require("./routes.js")(app);
mongoose.connect(keys.mlab, {
  
}).then(function() {
	console.log('Mongo connected via mongoose')
})

const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);