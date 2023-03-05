const dayjs = require('dayjs');

const date = () => {
    return dayjs().format('YYYY-MM-DD');
    };

module.exports = date;
