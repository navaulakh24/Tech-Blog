const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

router.post("/post", withAuth, async (req, res) => {
    try {
        req.body.user_id = req.session.user_id;
        const postData = await Post.create(req.body);
        const post = postData.get({ plain: true });
        res.render("post", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/comment/:id", withAuth, async (req, res) => {
    try {
        req.body.post_id = req.params.id;
        req.body.user_id = req.session.user_id;
        const commentData = await Comment.create(req.body);
        const comment = commentData.get({ plain: true });
        res.render("post", { comment, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/comment/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        commentData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ]
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/comment/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        commentData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ]
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render("dashboard", { comments, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.loggedIn = true;
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user with that username!" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    });
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;