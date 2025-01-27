const express = require("express");
const authorsControler = require("../controllers/authorsController");
const {
  getAllAuthors,
  getAuthor,
  getAuthorsByPage,
  postAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorsByName,
} = authorsControler;
const { protect, allowAccessTo } = require("../controllers/authControler");

const authorsRouter = express.Router();

//author router after  api/authors

authorsRouter
  .route("/")
  .get(getAllAuthors)
  .post(protect, allowAccessTo("admin"), postAuthor);

// pagination and search routers

  authorsRouter.route("/search").get(getAuthorsByName);
  authorsRouter.route("/page").get(getAuthorsByPage);
  
//authors router after api/authors/:ID

authorsRouter
  .route("/:id")
  .get(getAuthor)
  .patch(protect, allowAccessTo("admin"), updateAuthor)
  .delete(protect, allowAccessTo("admin"), deleteAuthor);

//authors router after api/authors/:ID


module.exports = authorsRouter;
