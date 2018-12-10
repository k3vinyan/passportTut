const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

require('dotenv').config()

passport.serializeUser((user, done) => {
    console.log('serializeUser: ', user)
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser: ', id)
    User.findById(id, (err, user)  => {
        done(err, user)
    })
})


passport.use(new googleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET
}, (accessToken, resfreshToken, profile, done) => { 
    User.findOne({googleID: profile.id}, (err, user) => {
        if(user){
            //user already existed
            console.log('user already existed')
            done(null, user)
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id
            }).save().then( (user) => {
                console.log(user)
                done(null, user)
            })
        }
    })
    
}))
