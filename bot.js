require('dotenv').config({path: __dirname + '/.env'});
const twit = require('twit');

const Twitter = new twit(config);

