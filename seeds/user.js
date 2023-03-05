const { User } = require('../models');

const userData = async () => {
    await User.create({
        username: 'Nav',
        email: 'nav@nav.com',
        password: 'password1',
    });
    await User.create({
        username: 'Adam',
        email: 'adam@adam.com',
        password: 'password2',
    });
};

module.exports = userData;