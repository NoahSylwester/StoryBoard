const db = require("../models");

// Defining methods for the TopicsController
module.exports = {
  findAll: function(req, res) {
    db.Topic
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Topic
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Topic
      .find({keyword: req.body.keyword})
      .then((response) => {
        if (response.length === 0) {
          db.Topic
            .create(req.body)
            .then(Topic => {
              db.Thread.findOneAndUpdate({ _id: req.body.thread }, { $push: { Topics: Topic._id } }, { new: true })
              .then(() => res.json(Topic))
            })
            .catch(err => res.status(422).json(err));
        }
        else {
          res.status(409).json({failure: "topic already exists"})
        }
      })

  },
  update: function(req, res) {
    db.Topic
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Topic
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
