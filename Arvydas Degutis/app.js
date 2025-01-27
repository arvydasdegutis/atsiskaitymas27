const express = require("express");
const { sayHello, addRequestedDate } = require("./middlewares/appMiddlewares");
const userRouter = require("./routers/userRouter");
const booksRouter = require("./routers/booksRouter");
const authorsRouter = require("./routers/authorsRouter.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
//body parser
app.use(express.json());


//middlewares for cookies parsing
app.use(cookieParser());
// const tourRouter = express.Router();
app.use(sayHello, addRequestedDate);

//routes

app.use("/api/users", userRouter); // USERS router
app.use("/api/books", booksRouter); // Books router
app.use("/api/authors", authorsRouter); // Books router

app.use(errorHandler);
module.exports = app;


