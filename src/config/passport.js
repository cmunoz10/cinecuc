const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    // Match Email's User
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'No se encontro un usuario con los datos ingresados ' });
    } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Ingresaste una contraseña equivocada.' });
        }
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