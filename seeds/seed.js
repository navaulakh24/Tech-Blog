const sequelize = require('../config/connection');
const seedPost = require('./post');
const seedUser = require('./user');
const seedComment = require('./comment');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedAll();
