import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamService = new TeamService()) {}
  public async getAll(_req: Request, res: Response): Promise<Response | void> {
    const response = await this.teamService.getAll();
    res.status(200).json(response);
  }

  public async getById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const result = await this.teamService.getById(Number(id));
    res.status(200).json(result);
  }
}

export default TeamController;
