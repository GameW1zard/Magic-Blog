const seedusers = require('./seedusers.js');
const seedposts = require('./seedposts.js');
const seedcomments = require('./seedcomments.js');

const sequelize = require('../config/connection.js');
async function seedAll() {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedusers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedposts();
    console.log('\n----- POSTS SEEDED -----\n');
    await seedcomments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    process.exit(0);
}

seedAll();