const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/events"
router.route("/")
  .get(eventsController.findAll)
  .post(eventsController.create);

// Matches with "/api/events/search"
router.route("/search")
  .post(eventsController.searchAll)

// Matches with "/api/events/soonest"
router.route("/soonest")
  .get(eventsController.findSoonest)

// Matches with "/api/events/:id"
router
  .route("/:id")
  .get(eventsController.findById)
  .put(eventsController.update)
  // .delete(eventsController.remove);

module.exports = router;