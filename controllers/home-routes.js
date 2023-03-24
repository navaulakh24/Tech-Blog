const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                }
            ],
        });

        const postsData = dbPostData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts: postsData,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
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
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("dashboard", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ],
        });

        const post = postData.get({ plain: true });
        const changePost = (req.session.user_id === post.user_id);
res.render("post", { post,
            loggedIn: req.session.loggedIn, changePost: changePost });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/comment/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });
        const comment = commentData.get({ plain: true });
        const changeComment = (req.session.user_id === comment.user_id);
        res.render("comment", { comment, loggedIn: req.session.loggedIn, changeComment: changeComment });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/addcomment/:id", withAuth, (req, res) => {
    res.render("addcomment", { hdr: "Comment", loggedIn: req.params.loggedIn });
});

router.get('/addpost', withAuth, (req, res) => {
    res.render('addpost', { hdr: "Post", loggedIn: req.params.loggedIn });
});

router.get('/editpost/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
            const post = postData.get({ plain: true });
            await res.render('editpost', { post, loggedIn: req.params.loggedIn });
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.get("/deletepost/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        await res.render("deletepost", { post, loggedIn: req.params.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/editcomment/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        const comment = commentData.get({ plain: true });
        await res.render("editcomment", { comment, loggedIn: req.params.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/deletecomment/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        const comment = commentData.get({ plain: true });
        await res.render("deletecomment", { comment, loggedIn: req.params.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;