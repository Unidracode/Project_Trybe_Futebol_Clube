import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';

class TeamService {
  protected team: ModelStatic<Team> = Team;

  async getAll(): Promise<Team[]> {
    const res = await this.team.findAll();
    return res;
  }

  async getById(id: number): Promise<Team | null> {
    const result = await this.team.findByPk(id);
    return result;
  }
}

export default TeamService;
