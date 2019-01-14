import passport from 'passport';
import { Strategy } from 'passport-local';
import User from 'model/User';

passport.use(
  'local',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      return User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        return user
          .verifyPassword(password)
          .then(valid => {
            if (!valid) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          })
          .catch(() => done(null, false, { message: 'Incorrect password.' }));
      });
    }
  )
);

export default function(app) {
  app.use(passport.initialize());
  return app;
}
