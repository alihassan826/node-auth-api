const auth = require('../controller/auth.controller');

const authMiddleware = require('../middleware/auth')

module.exports = function (app) {
    app.route('/login').post(auth.login);

    app.route('/register').post(auth.register);

    app.route('/user').all(authMiddleware).post(auth.user);
};
