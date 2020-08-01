const db = require("../models");

// Defining methods for the ThreadsController
module.exports = {
  findAll: function(req, res) {
    db.Thread
      .find(req.query)
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  searchAll: async function(req, res) {
    let searchEntity;
    const parseInputs = async function () {
      if (req.body.searchOption === 'title') {
        searchEntity = new RegExp(req.body.searchInput, "i");
      }
      else if (req.body.searchOption === 'topics') {
        searchEntity = { $in: [ req.body.searchInput ] }
      }
      else if (req.body.searchOption === 'author') {
        userSearchEntity = new RegExp(req.body.searchInput, "i");

        const findUser = async function() {
          await db.User
          .find({ name: userSearchEntity })
          .then(dbUser => {
            return searchEntity = dbUser.map((user) => user._id);
          })
          .catch(err => res.status(422).json(err));
        }

        await findUser();
      }
      else if (req.body.searchOption === 'content') {
        searchEntity = new RegExp(req.body.searchInput, "i");
      }
    }
    await parseInputs();
    db.Thread
      .find({ [req.body.searchOption]: searchEntity })
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Thread
      .findById(req.params.id)
      .populate({
        path: 'posts',
        populate: { path: 'author', select: "_id name"}
      })
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findLatest: function(req, res) {
    db.Thread
    .find(req.query)
    .populate("author", "_id name")
    .then(dbModel => {
      const sorted = dbModel.sort((a, b) => {
        if (a.lastActivity > b.lastActivity) {
          return -1;
        }
        else if (a.lastActivity < b.lastActivity) {
          return 1;
        }
        return 0;
        }
      )
      return res.json(sorted.slice(0, 3))
    })
    .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.findById(req._id)
    .then(function({ _id }) {
      db.Thread
      .create({ ...req.body, author: _id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Thread
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Thread
      .deleteOne({ _id: req.params.id })
      .then(dbModel => {
        db.Post.deleteMany({thread: req.params.id})
        .then(() => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
