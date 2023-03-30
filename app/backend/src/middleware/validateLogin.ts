import { Request, Response, NextFunction } from 'express';

const validatingEmail = (email: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validatingEmail(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return next();
}

export default validateLogin;
