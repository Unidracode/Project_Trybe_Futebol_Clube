import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async leaderBoard(req: Request, res: Response) {
    const leaderBoard = await LeaderBoardService.leaderBoard();
    res.status(200).json(leaderBoard);
  }

  static async leaderBoardAway(req: Request, res: Response) {
    const leaderBoardAway = await LeaderBoardService.leaderBoardAway();
    res.status(200).json(leaderBoardAway);
  }
}
