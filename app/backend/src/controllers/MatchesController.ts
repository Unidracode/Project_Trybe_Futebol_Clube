import { Request, Response } from 'express';
import MatchService from '../services/MatchesService';

class MatchController {
  constructor(private matcheService = new MatchService()) {}

  public async getAll(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const matches = await this.matcheService.getAll(inProgress);
    res.status(200).json(matches);
  }

  async closedMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matcheService.closedMatches(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matcheService.updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Placar Alterado' });
  }

  async newMatch(req: Request, res: Response): Promise<Response | void> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await
    this.matcheService.newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    res.status(201).json(match);
  }
}

export default MatchController;
