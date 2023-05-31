const Users = require('../models/Users.js');

const userdata = {
    user_name: 'GameW1zard',
    password: "password"
};
const seedusers = () => Users.create(userdata);

module.exports = seedusers;