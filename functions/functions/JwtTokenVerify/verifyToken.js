import jwt from "jsonwebtoken";
import { createError } from "../error/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Vous n'êtes pas authentifier!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token n'est pas valide!"));
    req.user = user;
    next();
  });
};
