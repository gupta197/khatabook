const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

const CONSUMERKEY = 'EAAjL3Qzzmw5yIvG';
const CONSUMERSECRET = 'WrbhloqmjL7n27jZWWLnu_5vJ05Aa7ul5ViHT5TIw5o';

class Oauth1Helper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: {key: CONSUMERKEY, secret: CONSUMERSECRET},
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
    });

    const authorization = oauth.authorize(request);
    console.log('authorization--', authorization);
    

    return oauth.toHeader(authorization);
  }
}

module.exports = Oauth1Helper;