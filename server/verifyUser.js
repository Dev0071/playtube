import Jwt from 'jsonwebtoken';
import { creatError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(creatError(401, 'you are not authenticated'));

  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(creatError(401, 'token not valid'));
    req.user = user;
    next();
  });
};
