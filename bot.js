const twit = require('twit');
const config = require('./config')
const Twitter = new twit(config);

const retweet = () => {
  const params = {
    q: '#webdevelopment',
    result_type: 'recent',
    lang: 'en',
    count: '10'
  }

  Twitter.get('search/tweets', params, (err, data, res) => {
    if (err) {
      console.log(err.message);
    } else {

      let ids = []
      data.statuses.forEach((tweet) => {
        ids.push(tweet.id_str);
      })

      console.log(ids);

      for (i = 0; i < ids.length; i++) {
        Twitter.post('statuses/retweet/' + ids[i], (err, data, res) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log('Retweeted!');
            i = ids.length;
          }
        })
      }
    }
  })
}

retweet();
console.log('\033[2J');
console.log('Running retweet...');

setInterval(retweet, 10000);