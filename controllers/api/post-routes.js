const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");


router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
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
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [
                        User,
                    ],
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render("post", {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/post/:id", withAuth, async (req, res) => {