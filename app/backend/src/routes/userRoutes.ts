import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middleware/validateLogin';
import validateToken from '../middleware/validateToken';

const routerUser = Router();

const userService = new UserService();
const userController = new UserController(userService);

routerUser.post(
  '/',
  validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
  routerUser.get(
    '/role',
    validateToken,
    (req: Request, res: Response) => userController.roleLogin(req, res),
  ),
);

export default routerUser;
