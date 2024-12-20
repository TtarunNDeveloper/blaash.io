const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const User = require('./models/User'); 

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://your-custom-domain.com/auth/google/callback",
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly']
},
async (token, tokenSecret, profile, done) => {
  try {
    // Save or update user to your database
    const user = await User.findOneAndUpdate(
      { email: profile.emails[0].value },
      { username: profile.displayName, profilePhoto: profile.photos[0].value, accessToken: token },
      { new: true, upsert: true }
    );
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard'); // Redirect to frontend dashboard
  }
);

// Endpoint to get YouTube data
app.get('/api/youtube', async (req, res) => {
  if (req.isAuthenticated()) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    try {
      const response = await youtube.channels.list({
        part: 'snippet,contentDetails,statistics',
        mine: true
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
