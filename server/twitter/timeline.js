import Twit from 'twit';

export default (screenName) => {

const T = new Twit({
  consumer_key:         'WUJtWQdOJadVdMUfxdXbK5alr',
  consumer_secret:      'tndsrETeuNO9uyKmwuSASAFmSn1J0l2YG6EfNeCeEOru5i0qEI',
  access_token:         '2168289821-CcQyFm5vI8HrUhlhaaMvK033VcF1rTJnEzN7PBn',
  access_token_secret:  'v3wgUWrnhmF7fPjpT2bNB72HZgkidqw5w4ORjKUNbUJHg',
  timeout_ms:           60*1000,
})

const options = { screen_name: screenName,
                count: 3 };

  return new Promise( (resolve,reject) => {
    T.get('statuses/user_timeline', options , function(err, data) {
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    });
  });


}
