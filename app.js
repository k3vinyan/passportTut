const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const authGoogleSetup = require('./config/auth-setup');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('dotenv').config()

app.use(cookieSession({
    maxAge: 86400000, //one day in miliseconds
    keys: [process.env.COOKIE_SECRET]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to database')
}, { useNewUrlParser: true })

app.use('/auth', authRoutes);
app.use('/proflie', profileRoutes);


app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.listen('3000', () => {
    console.log('listening on port: ', 3000);
});