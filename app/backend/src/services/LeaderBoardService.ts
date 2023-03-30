import Matches from '../database/models/Matches';
import Team from '../database/models/Team';
import { iTeam } from '../interfaces/iTeam';
import { teamsHome, teamsAway, teamsClassified } from '../utils/leaderboard';

export default class LeaderBoardService {
  static async leaderBoard() {
    const teams = await Team.findAll();

    const homeTeams = await teams.map(async (team) => {
      const homeMatches = await Matches.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const statisticsHome = await homeMatches.map((match) => (
        teamsHome(team.teamName, [match])));

      const statisticsTeams = statisticsHome[homeMatches.length - 1];
      return { ...statisticsTeams };
    });

    const results = await Promise.all(homeTeams);
    const classifiedTeams = teamsClassified(results);
    return classifiedTeams;
  }

  static async leaderBoardAway() {
    const teams = await Team.findAll() as iTeam[];
    const teamsVisitingStats = await Promise.all(
      teams.map(async (team) => {
        const awayGames = await Matches.findAll({
          where: { awayTeamId: team.id, inProgress: false },
        });
        const teamAwayStats = await Promise.all(
          awayGames.map((match) => teamsAway(team.teamName, [match])),
        );
        const teamsStats = teamAwayStats[awayGames.length - 1];
        return { ...teamsStats };
      }),
    );
    const resultsSorted = teamsClassified(teamsVisitingStats);
    return resultsSorted;
  }
}
