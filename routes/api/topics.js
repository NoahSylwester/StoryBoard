const router = require("express").Router();
const topicsController = require("../../controllers/topicsController");
const checkAdmin = require('../../adminMiddleware');

// Matches with "/api/topics"
router.route("/")
  .get(topicsController.findAll)
  .post(topicsController.create);

// Matches with "/api/topics/:id"
router
  .route("/:id")
  .get(topicsController.findById)
  .put(checkAdmin, topicsController.update)
  // .delete(checkAdmin, topicsController.remove);

module.exports = router;