const { sql } = require("../dbConnection");


//models

//get all books model
exports.getAllBooks = async () => {
    const booksList = await sql`
      SELECT books.*, authors.name as author, authors.biography as author_bio, TO_CHAR(authors.birthdate, 'YYYY-MM-DD') AS birthdate
      FROM books
      JOIN authors ON books.authorid = authors.id
      `;
    return booksList;
  };

  //get book by id

  exports.getBookById = async (id) => {
    const books = await sql`
      SELECT books.*, authors.name as author, authors.biography as author_bio, TO_CHAR(authors.birthdate, 'YYYY-MM-DD') AS birthdate
      FROM books 
      JOIN authors ON books.authorid = authors.id
      WHERE books.id = ${id}
      `;
    return books[0]; 
  };
  

  //Books pagination
  exports.getBooksByPage = async (limit, offset) => {
    const bookList = await sql`
      SELECT books.*
      FROM books
      LIMIT ${limit} OFFSET ${offset}
    `;
    
    const total = await sql`
      SELECT COUNT(*) AS count FROM books
    `;
    
    return { bookList, totalCount: total[0].count };
};
  

  // post book model

  exports.postBook = async (book) => {
    const columns = [ 
        'title',
        'summary',
        'isbn',
        'authorid'
    ]
  const insertedBook =
    await sql` 
    INSERT INTO books ${sql(book, columns)}
    RETURNING*`;
  return insertedBook[0];
};

// update book model

exports.updateBook = async (id, book) => {
    const columns = Object.keys(book)
      const updatedBook = await sql`
        UPDATE books 
        SET ${sql(book, columns)}
        WHERE books.id = ${id}
        RETURNING *;
      `;
      return updatedBook[0];
  };

  //delete book model

  exports.deleteBook = async (id) => {
    const deletedBook = await sql`
      DELETE FROM books
      WHERE id = ${id}
      RETURNING *;
    `;
    return deletedBook;
};

//search for books

exports.getBooksByTitle = async (title) => {
    const books = await sql`
      SELECT books.*, authors.name as author
      FROM books
      JOIN authors ON books.authorid = authors.id
      WHERE books.title ILIKE '%' || ${title} || '%'
      ORDER BY books.id;
    `;
    return books;
};


