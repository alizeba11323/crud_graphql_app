const { JWT_SECRET } = require("../config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
module.exports = async (req, res, next) => {
  const headerAuth = req.get("Authorization"); //bearer token ["bearer","token"]
  if (!headerAuth) {
    req.isAuth = false;
    req.user = null;
    return next();
  }
  const token = headerAuth.split(" ")[1];
  if (!token) {
    req.isAuth = false;
    req.user = null;
    return next();
  }
  try {
    const data = await jwt.verify(token, JWT_SECRET);
    if (!data) {
      req.isAuth = false;
      req.user = null;
      return next();
    }
    const user = await User.findById(data.id);
    if (!user) {
      req.isAuth = false;
      req.user = null;
      return next();
    }
    req.isAuth = true;
    req.user = {
      ...user._doc,
      password: null,
    };
    return next();
  } catch (err) {
    throw new GraphQLError(err.message);
  }
};
