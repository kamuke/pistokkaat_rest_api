'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const {getUserLogin} = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const data = [username];
      
      try {
        const [user] = await getUserLogin(data);
        console.log('Local strategy', user);
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        delete user.password;
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
  }));

// JWT strategy for handling bearer token
passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asdfghjkl'
  }, (jwtPayload, done) => {
    console.log('JWTStrategy: ', jwtPayload);
    done(null, jwtPayload);
}));

module.exports = passport;