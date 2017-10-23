// require ('./../config');
const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const FacebookStrategy = require ('passport-facebook');
const GitHubStrategy = require ('passport-github2');
const TwitterStrategy = require ('passport-twitter');

const User = require ('./../models/User');

// serialize user an get token
// this is what the google strategy will save seconds before to save
passport.serializeUser ((user, done) => {
  // no error and serialize user.id
  // this user.id comes from the mongodb document Object ID
  // since is very easier to find the document id than the google id since
  // it could be facebook, twitter or other provider id
  // === IMPORTANT ===
  // Oauth's only pupose is to allow someone to sign in. afeter that,
  // We use our own internal document Object ID
  done (null, user.id);
});

passport.deserializeUser ((id, done) => {
  User.findById (id).then (user => {
    done (null, user);
  });
});

passport.use (
  new GoogleStrategy (
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true, // if this request pass in any proxy is ok nice to avoid change https to http in heroku
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne ({
        googleId: profile.id,
      });

      if (!existingUser) {
        const newUser = new User ({
          googleId: profile.id,
          displayName: profile.displayName,
          avatar: profile.photos[0].value,
          gender: profile.gender,
          provider: profile.provider,
        });

        const user = await newUser.save ();
        return done (null, user);
      }

      // user exists so no error (null) and pass in the user
      done (null, existingUser);
    }
  )
);

// passport.use (
//   new FacebookStrategy (
//     {
//       clientID: process.env.facebookClientID,
//       clientSecret: process.env.facebookClientSecret,
//       callbackURL: '/auth/facebook/callback',
//       proxy: true,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne ({
//         facebookId: profile.id,
//       })
//         .then (existingUser => {
//           if (!existingUser) {
//             const newUser = new User ({
//               facebookId: profile.id,
//               displayName: profile.displayName,
//               gender: profile.gender,
//               provider: profile.provider,
//             });

//             newUser.save ().then (user => done (null, user));
//           }

//           // user exists so no error (null) and pass in the user
//           done (null, existingUser);
//         })
//         .catch (err => done (err));
//       // console.log ('profile', profile);
//     }
//   )
// );

// passport.use (
//   new GitHubStrategy (
//     {
//       clientID: process.env.githubClientID,
//       clientSecret: process.env.githubClientSecret,
//       callbackURL: '/auth/github/callback',
//       proxy: true,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne ({
//         githubId: profile.id,
//       })
//         .then (existingUser => {
//           if (!existingUser) {
//             const newUser = new User ({
//               githubId: profile.id,
//               displayName: profile.displayName,
//               avatar: profile.avatar_url,
//               provider: profile.provider,
//             });

//             newUser.save ().then (user => done (null, user));
//           }

//           // user exists so no error (null) and pass in the user
//           done (null, existingUser);
//         })
//         .catch (err => done (err));
//     }
//   )
// );

// passport.use (
//   new TwitterStrategy (
//     {
//       consumerKey: process.env.twitterConsumerKey,
//       consumerSecret: process.env.twitterConsumerSecret,
//       callbackURL: 'http://localhost:3000/auth/twitter/callback',
//       proxy: true,
//     },
//     function (token, tokenSecret, profile, done) {
//       User.findOne ({
//         twitterId: profile.id,
//       })
//         .then (existingUser => {
//           if (!existingUser) {
//             const newUser = new User ({
//               twitterId: profile.id,
//               displayName: profile.name,
//               avatar: profile.photos[0].value,
//               provider: profile.provider,
//             });

//             newUser.save ().then (user => done (null, user));
//           }

//           // user exists so no error (null) and pass in the user
//           done (null, existingUser);
//         })
//         .catch (err => done (err));
//     }
//   )
// );
