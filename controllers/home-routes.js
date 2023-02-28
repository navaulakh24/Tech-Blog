const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
        include: [
            {
            model: User,
            attributes: ["name"],
            },
        ],
        });
    
        const posts = dbPostData.map((post) => post.get({ plain: true }));
    
        res.render("all-posts", {
        posts,
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await User.findByPk(req.session.user_id, {
        attributes: {
            exclude: ["password"],
        },
        include: [
            {
            model: Post,
            },
        ],
        });
    
        const user = userData.get({ plain: true });
    
        res.render("dashboard", {
        user,
        logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get("post", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("post");
    });

router.get("/signUp", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signUp");
    });

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
    });

module.exports = router;