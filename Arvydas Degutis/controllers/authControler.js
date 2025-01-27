const argon2 = require("argon2");
const { createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { getUser, getUserById } = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;

    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    newUser.role = 'user';
    const createdUser = await createUser(newUser);

    //po signup iskarto login

    const token = signToken(createdUser.id);

    //coookie issiuntimas su tokien

    sendCookie(token, res);
    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await getUser(username);
    const token = signToken(user.id);
    sendCookie(token, res);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
   
    if (!token) {
      throw new AppError(401, "You are not logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await getUserById(decoded.id);

    if (!currentUser)
      throw new AppError(401, 
        "The user belonging to this token does no longer exist"
      );
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try{
      if (!roles.includes(req.user.role)) 
        throw new AppError(403, "You do not have permission to perform this action");
      next();
    }
    catch (error) {
      next(error);
    }
  }
  
}