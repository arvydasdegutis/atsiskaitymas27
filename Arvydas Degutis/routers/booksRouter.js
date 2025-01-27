const express = require("express");
const booksController = require("../controllers/booksController");
const {
  getAllBooks,
  getBook,
  getBooksByPage,
  postBook,
  updateBook,
  deleteBook,
  getBooksByTitle
} = booksController;
const { protect, allowAccessTo } = require("../controllers/authControler");

const booksRouter = express.Router();

//books router after api/books


module.exports = booksRouter;

booksRouter
  .route("/")
  .get(getAllBooks)
  .post(protect, allowAccessTo("admin"), postBook);


booksRouter.route("/page").get(getBooksByPage);
booksRouter.route("/search").get(getBooksByTitle);


//books router after api/books/:ID
  booksRouter
  .route("/:id")
  .get(getBook)
  .patch(protect, allowAccessTo("admin"), updateBook)
  .delete(protect, allowAccessTo("admin"), deleteBook);



module.exports = booksRouter;
