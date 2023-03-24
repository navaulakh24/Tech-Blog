const { Post } = require('../models');

const postData = [
    {
        name: 'Post 1',
        date: '2021-01-01',
        body: 'This is a post',
        user_id: 1
    },
    {
        name: 'Post 2',
        date: '2021-01-01',
        body: 'This is another post',
        user_id: 2
    },
    {
        name: 'Post 3',
        date: '2021-01-01',
        body: 'This is a third post',
        user_id: 1
    },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;