import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.leaderBoard(req, res));

leaderBoardRoutes.get('/away', (req: Request, res: Response) =>
  LeaderBoardController.leaderBoardAway(req, res));

export default leaderBoardRoutes;
