const db = require("../models");

// Defining methods for the EventsController
module.exports = {
  findAll: function(req, res) {
    db.Event
      .find({quarantined: false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  adminFindAll: function(req, res) {
    db.Event
      .find()
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
      else if (req.body.searchOption === 'date') {
        const date = new Date(req.body.searchInput);
        // construct a search range of +-24 hours
        searchEntity = { 
          $gte: date - (3600000 * 24), 
          $lte: date - (-3600000 * 24)
        }

      }
      else if (req.body.searchOption === 'content') {
        searchEntity = new RegExp(req.body.searchInput, "i");
      }
    }
    await parseInputs();
    db.Event
      .find({ quarantined: false, [req.body.searchOption]: searchEntity })
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  adminSearchAll: async function(req, res) {
    let searchEntity;
    const parseInputs = async function () {
      if (req.body.searchOption === 'title') {
        searchEntity = new RegExp(req.body.searchInput, "i");
      }
      else if (req.body.searchOption === 'topics') {
        searchEntity = { $in: [ req.body.searchInput ] }
      }
      else if (req.body.searchOption === 'date') {
        const date = new Date(req.body.searchInput);
        // construct a search range of +-24 hours
        searchEntity = { 
          $gte: date - (3600000 * 24), 
          $lte: date - (-3600000 * 24)
        }

      }
      else if (req.body.searchOption === 'content') {
        searchEntity = new RegExp(req.body.searchInput, "i");
      }
    }
    await parseInputs();
    db.Event
      .find({ [req.body.searchOption]: searchEntity })
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .populate("posts")
      .populate("author", "_id name")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findSoonest: function(req, res) {
    db.Event
      .find(req.query)
      .then(dbModel => {
        const rightNow = Date.now();
        const sorted = dbModel.sort((a, b) => {
          const A = a.date - rightNow;
          const B = b.date - rightNow;
          if (A > B) {
            return 1;
          }
          else if (A < B) {
            return -1;
          }
          return 0;
          }
        );
        const filtered = sorted.filter((item) => item.date - Date.now() > 0)
        return res.json(filtered.slice(0, 4))
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    db.Event
      .create({...req.body, author: req._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => {console.log(err);res.status(422).json(err)});
  },
  update: function(req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Event
      .deleteOne({ _id: req.params.id })
      .then(dbModel => {
        db.Post.deleteMany({event: req.params.id})
        .then(() => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
