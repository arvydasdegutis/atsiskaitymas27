const {
  getAllBooks,
  getBookById,
  getBooksByPage,
  postBook,
  updateBook,
  deleteBook, 
  getBooksByTitle
} = require("../models/booksModel");
const AppError = require("../utils/appError");
//controllers

//Get All Books

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

//Get one book from id

exports.getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
        throw new AppError(404, 'invalid ID');
    }
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

//Pagination


exports.getBooksByPage = async (req, res, next) => {
    try {
      let { page, limit } = req.query;
      page = parseInt(page); 
      limit = parseInt(limit); 
      const offset = (page - 1) * limit;
      const { books, totalCount } = await getBooksByPage(limit, offset);
      if (!books.length === 0) {
        throw new AppError(404, "No books found");
      }
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: books,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

// Post Book controller

exports.postBook = async (req, res, next) => {
  try {
    const tour = req.body;
    const newTour = await postBook(tour);
    res.status(200).json({
      status: "success",
      data: newTour,
    });
  } catch (error) {
    next(error);
  }
};

//Update Book controller

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = req.body;
    const updatedBook = await updateBook(id, book);
    if (!updatedBook) {
        throw new AppError(404, 'invalid ID');
    }
    res.status(200).json({
      status: "success",
      data: updatedBook,
    });
} catch (error) {
    next(error);
  }
};


//Delete Book controller


exports.deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedTour = await deleteBook(id);
      if (!deletedTour) {
        throw new AppError(404, 'Invalid ID');
      }
      res.status(204).json({
        status: 'success',
        data: deletedTour,
      });
    } catch (error) {
        next(error);
    }
  };

  //Search for books

  exports.getBooksByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (!title) {
            throw new AppError(400, 'title is required');
        }
        const books = await getBooksByTitle(title);

        res.status(200).json({
            status: "success",
            data: books,
        });
    } catch (error) {
        next(error);
    }
};



  