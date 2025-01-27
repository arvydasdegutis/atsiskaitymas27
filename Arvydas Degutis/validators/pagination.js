const { query } = require('express-validator');
const { getDifficultyById } = require('../models/tourModel');

const paginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }) //must be an integer >= 1
    .withMessage('Page must be a positive integer') //error message
    .toInt(), //convert to integer

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }) //must be an integer between 1 and 100
    .withMessage('Limit must be a positive integer between 1 and 100') //error message
    .toInt()
    .custom((value) => {
      if (value % 3 !== 0) {
        throw new Error('Limit must be a multiple by 3');
      }
      return true; //validation passed
    }),
];

module.exports = paginationValidator;
