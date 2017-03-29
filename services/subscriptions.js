const {createSubscriptionManager} = require('../graph');
const session = require('./session');
const passport = require('./passport');

module.exports = class Subscriptions {

  static deserializeUser(req) {
    return new Promise((resolve, reject) => {
      session(req, {}, () => {
        
        if ('session' in req && 'passport' in req.session && 'user' in req.session.passport) {
          passport.deserializeUser(req.session.passport.user, (err, user) => {
            if (err) {
              return reject(err);
            }
            
            req.user = user;
            
            return resolve(req);
          });
        } else {
          resolve(req);
        }
        
      });
    });
  }

  static mount(server) {

    // Create the SubscriptionManager and mount it on the specified route with
    // this deserializer.
    createSubscriptionManager(server, '/api/v1/live', Subscriptions.deserializeUser);
  }
};