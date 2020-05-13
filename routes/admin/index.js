const router = require("express").Router();
const withAuth = require('../../middleware');
const eventsController = require("../../controllers/eventsController");
const snippetsController = require("../../controllers/snippetsController");
const topicsController = require("../../controllers/topicsController");
const threadsController = require("../../controllers/threadsController");
const usersController = require("../../controllers/usersController");
const postsController = require("../../controllers/postsController");

const checkAdmin= require('../../adminMiddleware');

// admin routes that return quarantined as well as unquarantined events
router.route('/events')
.get(withAuth, checkAdmin, eventsController.adminFindAll)
router.route('/events/search')
.post(withAuth, checkAdmin, eventsController.adminSearchAll)

// routes for creating/removing topics
router.route('/topic/')
.post(withAuth, checkAdmin, topicsController.create)

router.route('/topic/:id')
.delete(withAuth, checkAdmin, topicsController.remove)

// update routes for editing threads/snippets/events/users
router.route('/thread/:id')
.put(withAuth, checkAdmin, threadsController.update)

router.route('/snippet/:id')
.put(withAuth, checkAdmin, snippetsController.update)

router.route('/event/:id')
.put(withAuth, checkAdmin, eventsController.update)

router.route('/user/:id')
.put(withAuth, checkAdmin, usersController.update)

router.route('/post/:id')
.put(withAuth, checkAdmin, postsController.update)

// delete routes for deleting threads/snippets/events/users
router.route('/thread/:id')
.delete(withAuth, checkAdmin, threadsController.remove)

router.route('/snippet/:id')
.delete(withAuth, checkAdmin, snippetsController.remove)

router.route('/event/:id')
.delete(withAuth, checkAdmin, eventsController.remove)

router.route('/user/:id')
.delete(withAuth, checkAdmin, usersController.remove)

router.route('/post/:id')
.delete(withAuth, checkAdmin, postsController.remove)


module.exports = router;