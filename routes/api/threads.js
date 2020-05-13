const router = require("express").Router();
const threadsController = require("../../controllers/threadsController");

// Matches with "/api/threads"
router.route("/")
  .get(threadsController.findAll)
  .post(threadsController.create);

// Matches with "/api/threads/latest"
router.route("/latest")
  .get(threadsController.findLatest)

// Matches with "/api/threads/search"
router.route("/search")
  .post(threadsController.searchAll)

// Matches with "/api/threads/:id"
router
  .route("/:id")
  .get(threadsController.findById)
  .put(threadsController.update)
  // .delete(threadsController.remove);

module.exports = router;
