const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.send('login')
})

router.get('/logout', (req, res) => {
    res.logout();
    res.redirect('/');
})


router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/proflie')
})

module.exports = router;
