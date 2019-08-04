const twit = require('twit');
const config = require('./config')
const Twitter = new twit(config);

const retweet = () => {
  const params = {
    q: '#ReactJS, #javascript, #MongoDB, #NodeJS, #coding',
    result_type: 'recent',
    lang: 'en',
    count: '15'
  }

Twitter.get('search/tweets', params, (err, data, res) => {
  if (err) {
    console.log(err.message);
  }
  console.log(data.statuses[0].id_str);
  Twitter.post('statuses/retweet/' + data.statuses[0].id_str, (err, data, res) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Retweeted!');
    }
  })
})
}

retweet();
console.log('\033[2J');
console.log('Running retweet...');

setInterval(retweet, 10000);