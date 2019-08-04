var count = 0;

function getRand(min = 600000, max = 960000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomTime = getRand();

function bot() {
  require('dotenv').config({path: __dirname + '/.env'})

  const Twitter = require('twitter')
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  })

  const stream = client.stream('statuses/filter', {
    track: '#ReactJS, #javascript, #mongodb, #php, #mysql'
  })

  stream.on('data', (event) => {
    client.post('favorites/create', {id: event.id_str}, (error, res) => {
      if(error) {
        //console.error(error[0].message)
      } else {
        //console.log(`${res.id_str} Liked!!!`)
      }
    })
    client.post('statuses/retweet/', {id: event.id_str}, (error, res) => {
      if(error) {
        //console.error(error[0].message, '\n')
      } else {
        //console.log(`${res.id_str} Retweeted!!! \n`)
        count++;
        let word = count === 1 ? ' tweet!':' tweets!';
        console.log('\033[2J');
        console.log('You have liked and retweeted ' + count + word);
        randomTime = getRand()
        let futureTime = new Date().getTime() + randomTime;
        let hours = new Date(futureTime).getHours() % 12;
        let minutes = new Date(futureTime).getMinutes();
        let fMinutes = minutes > 9 ? minutes:'0' + minutes.toString();
        let amPm = new Date(futureTime).getHours() < 13 ? 'AM':'PM';
        console.log('Next tweet cycle runs at ' + hours + ':' + minutes + ' ' + amPm);
        myTimer(randomTime);
        stream.destroy();
      }
    })
  })

  stream.on('error', error => console.error(error))
}

bot();
function myTimer(randomTime) {
  setTimeout(bot(), randomTime)
}