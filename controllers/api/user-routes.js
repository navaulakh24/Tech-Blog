const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get("/", (req, res) => {
User.findAll({
attributes: { exclude: ["password"] }
})
.then(dbUserData => res.json(dbUserData))
.catch(err => {
console.log(err);
res.status(500).json(err);
});
});

router.get("/:id", (req, res) => {
User.findOne({

















router.post("/", (req, res) => {
User.create({
username: req.body.username,
password: req.body.password,
})
.then(dbUserData => {
req.session.save(() => {
req.session.user_id = dbUserData.id;
req.session.username = dbUserData.username;
req.session.loggedIn = true;
res.json(dbUserData);
});
})
.catch(err => {
console.log(err);
res.status(500).json(err);
});
});