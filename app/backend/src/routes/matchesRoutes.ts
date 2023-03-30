import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchesController';
import validateToken from '../middleware/validateToken';
import validateMatches from '../middleware/validateMatches';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
matchRouter.patch('/:id/finish', validateToken, (req: Request, res: Response) =>
  matchController.closedMatches(req, res));
matchRouter.patch('/:id', validateToken, (req: Request, res: Response) =>
  matchController.updateMatches(req, res));
matchRouter.post('/', validateToken, validateMatches, (req: Request, res: Response) =>
  matchController.newMatch(req, res));
export default matchRouter;
