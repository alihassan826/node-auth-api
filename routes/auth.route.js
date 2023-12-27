const auth = require('../controller/auth.controller');

module.exports = function (app) {
    app.route('/login').post(auth.login);

    app.route('/register').post(auth.register);
};
