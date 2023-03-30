import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

class MatchService {
  model: ModelStatic<Matches> = Matches;

  async getAll(inProgress: unknown): Promise<Matches[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }
    return matches;
  }

  async closedMatches(id: number): Promise<void> {
    await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<number[] | undefined> {
    return this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async newMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  )
    : Promise<Matches> {
    return this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
  }
}

export default MatchService;