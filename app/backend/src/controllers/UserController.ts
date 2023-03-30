import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.service.login({ email, password });

    if (!token) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json(token);
  }

  async roleLogin(req: Request, res: Response) {
    const { email } = res.locals.token;
    const result = await this.service.roleLogin(email);
    if (!result) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json({ role: result });
  }
}

export default UserController;
