import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/token';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const tokenAuthentication = Jwt.checaToken(authorization);
    res.locals.token = tokenAuthentication;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateToken;
