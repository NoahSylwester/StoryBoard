const router = require("express").Router();
const snippetsController = require("../../controllers/snippetsController");
const multer = require('multer');
// set up multer oath
const upload = multer({dest: __dirname + '../../../uploads/temp'});
const withAuth = require('../../middleware');

// Matches with "/api/snippets"
router.route("/")
  .get(withAuth, snippetsController.findAll)
  .post(withAuth, snippetsController.create);

// Matches with "/api/snippets/search"
router.route("/search")
  .post(withAuth, snippetsController.searchAll)


// Matches with "/api/snippets/:id"
router
  .route("/:id")
  .get(withAuth, snippetsController.findById)
  .put(withAuth, snippetsController.update)
  // .delete(withAuth, snippetsController.remove);

// Matches with "/api/snippets/image/:id"
router
  .route("/image/:id")
  .get(snippetsController.serveBinaryImage)
  .put(withAuth, upload.single('file'), snippetsController.updateImage)

module.exports = router;
