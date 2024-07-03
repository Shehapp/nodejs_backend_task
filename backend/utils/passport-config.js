const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByEmailService } = require('../services/auth_service');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function(email, password, done) {
      try {
        var user = await getUserByEmailService(email);
        user = user[0];
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await getUserByEmailService(email);
      done(null, user[0]);
    } catch (err) {
      done(err);
    }
  });
};