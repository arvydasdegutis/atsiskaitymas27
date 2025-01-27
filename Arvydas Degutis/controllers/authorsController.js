const {
  getAllAuthors,
  getAuthorById,
  getAuthorsByPage,
  postAuthor,
  updatedAuthor,
  deleteAuthor,
  getAuthorsByName,
} = require("../models/authorsModel");
const AppError = require("../utils/appError");

//controllers

//Get All Authors
exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};

//Get one author from id

exports.getAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (!author) {
      throw new AppError(404, "No authors found");
    }
    res.status(200).json({
      status: "success",
      data: author,
    });
  } catch (error) {
    next(error);
  }
};

//Pagination
exports.getAuthorsByPage = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page); 
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const { authors, totalCount } = await getAuthorsByPage(limit, offset);
    if (!authors.length === 0) {
      throw new AppError(404, "No authors found");
    }
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: authors,
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

exports.postAuthor = async (req, res, next) => {
  try {
    const author = req.body;
    const newAuthor = await postAuthor(author);
    res.status(200).json({
      status: "success",
      data: newAuthor,
    });
  } catch (error) {
    next(error);
  }
};

//Update Book controller

exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = req.body;
    const updateAuthor = await updatedAuthor(id, author);
    if (!updateAuthor) {
      throw new AppError(404, "invalid ID");
    }
    res.status(200).json({
      status: "success",
      data: updateAuthor,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Book controller

exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await deleteAuthor(id);
    if (!deletedAuthor) {
      throw new AppError(404, "Invalid ID");
    }
    res.status(204).json({
      status: "success",
      data: deletedAuthor,
    });
  } catch (error) {
    next(error);
  }
};

//Search for authors

exports.getAuthorsByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      throw new AppError(400, "Name is required");
    }
    const authors = await getAuthorsByName(name);

    res.status(200).json({
      status: "success",
      data: authors,
    });
  } catch (error) {
    next(error);
  }
};
