const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const Users = require("../models/user.model");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await Users.findOne({ email: profile.emails[0].value });
          if (user) {
            done(null, user);
          }
          const newUser = new Users({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          });
          await newUser.save();
          done(null, newUser);
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findById(id).then((user) => {
      done(null, user);
    });
  });
};
