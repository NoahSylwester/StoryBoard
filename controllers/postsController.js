const db = require("../models");

// Defining methods for the PostsController
module.exports = {
  findAll: function(req, res) {
    db.Post
      .find(req.query)
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Post
      .findById(req.params.id)
      .populate({
        path: 'replies',
        populate: { path: 'author', select: "_id name"}
      })
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const entity = req.body.parentEntityType;
    const Entity = entity.charAt(0).toUpperCase() + entity.substring(1);
    db.User.findById(req._id)
      .then(function({ _id }) {
      db.Post
        .create({
          ...req.body,
          author: _id,
          [req.body.parentEntityType]: req.body.entityId
        })
        .then(post => {
          db[Entity].findOneAndUpdate({ _id: req.body.entityId }, { lastActivity: Date.now(), $push: { posts: post._id } }, { new: true })
          .then((entity) => {
            return res.json(post)
          })
        })
        .catch(err => res.status(422).json(err));
      })
    .catch(err => res.status(422).json(err));
  },
  createReply: function(req, res) {
    const entity = req.body.parentEntityType;
    const Entity = entity.charAt(0).toUpperCase() + entity.substring(1);
    db.User.findById(req._id)
      .then(function({ _id }) {
        db.Post
          .create({
            ...req.body,
            author: _id,
            [req.body.parentEntityType]: req.body.entityId
          })
          .then(reply => {
            db[Entity].findOneAndUpdate({ _id: req.body.entityId }, { lastActivity: Date.now() }, { new: true })
            .then(() => {
              db.Post.findOneAndUpdate({ _id: req.params.id }, { $push: { replies: reply._id } }, { new: true })
              .then(() => res.json(reply))
            })
          })
          .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, {content: null}, { new: true })
      .populate({
        path: 'replies',
        populate: { path: 'author', select: "_id name"}
      })
      .populate('author', '_id name')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
