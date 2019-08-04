var count = 0;

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
        console.log('You have liked/retweeted ' + count + word);
        stream.destroy();
      }
    })
  })

  stream.on('error', error => console.error(error))
}

bot();
setInterval(() => {
  bot();
}, 900000)