const { Comment } = require('../models');

const commentData = [
    {
        body: 'This is a comment',
        date: '2021-01-01',
        user_id: 1,
        post_id: 1
    },
    {
        body: 'This is another comment',
        date: '2021-01-01',
        user_id: 2,
        post_id: 2
    },
    {
        body: 'This is a third comment',
        date: '2021-01-01',
        user_id: 3,
        post_id: 3
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;


