const router = require('express').Router();

const { Users, Posts, Comments } = require('../../models');

// GET /api/users

router.get ('/', async function (req, res) {
    try {
        const userData = await Users.findAll({});
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post ('/', async function (req, res) {
    try {
        const userData = await Users.create(req.body);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post ('/login', async function (req, res) {
    try {
        const userData = await Users.findOne({ where: { user_name: req.body.user_name } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post ('/logout', async function (req, res) {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
        else {
            res.status(404).end();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;