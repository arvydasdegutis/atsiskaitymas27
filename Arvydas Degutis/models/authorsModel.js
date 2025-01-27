const { sql } = require("../dbConnection");

//models

//get all authors model
exports.getAllAuthors = async () => {
  const authorsList = await sql`
    SELECT 
      authors.*, TO_CHAR(authors.birthdate, 'YYYY-MM-DD') AS birthdate,
      ARRAY_AGG(books.title) AS books
    FROM authors
    JOIN books ON authors.id = books.authorid
    GROUP BY authors.id
    ORDER BY authors.id
  `;
  return authorsList;
};

//get author by id model

exports.getAuthorById = async (id) => {
  const authors = await sql`
    SELECT authors.*, TO_CHAR(authors.birthdate, 'YYYY-MM-DD') AS birthdate, ARRAY_AGG(books.title) AS books
    FROM authors 
    JOIN books ON authors.id = books.authorid
    WHERE authors.id = ${id}
        GROUP BY authors.id, authors.name, authors.birthdate
    `;
  return authors[0];
};

//pagination model

exports.getAuthorsByPage = async (limit, offset) => {
  console.log(limit);

  const authors = await sql`
    SELECT authors.* , TO_CHAR(authors.birthdate, 'YYYY-MM-DD') AS birthdate, ARRAY_AGG(books.title) AS books
      FROM authors
          JOIN books ON authors.id = books.authorid
                  GROUP BY authors.id, authors.name, authors.birthdate
         ORDER BY authors.id ASC
              ${
                !isNaN(limit) && !isNaN(offset)
                  ? sql`LIMIT ${limit} OFFSET ${offset}`
                  : sql``
              }  
      `;

      const total = await sql`
        SELECT COUNT(*) AS count 
        FROM authors
      `;

  return { authors, totalCount: total[0].count };
};

// post author model

exports.postAuthor = async (author) => {
  const columns = ["name", "birthdate", "biography"];
  const insertedBook = await sql` 
    INSERT INTO authors ${sql(author, columns)}
    RETURNING*`;
  return insertedBook[0];
};

// update author model

exports.updatedAuthor = async (id, author) => {
  const columns = Object.keys(author);
  const updatedAuthor = await sql`
        UPDATE authors 
        SET ${sql(author, columns)}
        WHERE authors.id = ${id}
        RETURNING *;
      `;
  return updatedAuthor[0];
};

//delete author model

exports.deleteAuthor = async (id) => {
  const deletedAuthor = await sql`
      DELETE FROM authors
      WHERE id = ${id}
      RETURNING *;
    `;
  return deletedAuthor;
};


//search author by name
exports.getAuthorsByName = async (name) => {
  const authors = await sql`
    SELECT authors.*, TO_CHAR(authors.birthdate, 'YYYY-MM-DD'), authors.name as author, ARRAY_AGG(books.title) AS books
    FROM authors
    JOIN books ON authors.id = books.authorid
    WHERE authors.name ILIKE '%' || ${name} || '%'
    GROUP BY authors.id, authors.name, authors.birthdate
    ORDER BY authors.id;

  `;
  return authors;
};
