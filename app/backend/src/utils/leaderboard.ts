import { iMatches } from '../interfaces/iMatches';
import { ileaderboard } from '../interfaces/iLeaderBoard';

const teams = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTeams = () => {
  teams.totalPoints = 0;
  teams.totalGames = 0;
  teams.totalVictories = 0;
  teams.totalDraws = 0;
  teams.totalLosses = 0;
  teams.goalsFavor = 0;
  teams.goalsOwn = 0;
  teams.goalsBalance = 0;
  teams.efficiency = 0;
};

const victoryHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const victoryAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const drawHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const drawAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const defeatHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 0;
  teams.totalLosses += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const defeatAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  teams.totalPoints += 0;
  teams.totalLosses += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const pointsHome = ((matches: iMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victoryHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) drawHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) defeatHome(homeTeamGoals, awayTeamGoals);
  });
});

const pointsAway = ((matches:iMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victoryAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) drawAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) defeatAway(homeTeamGoals, awayTeamGoals);
  });
});

const teamsHome = (name:string, matches:iMatches[]) => {
  if (name !== teams.name) {
    resetTeams();
  }
  teams.name = name;
  pointsHome(matches);
  teams.totalGames += 1;

  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
};

const teamsAway = (name:string, matches:iMatches[]) => {
  if (name !== teams.name) {
    resetTeams();
  }
  teams.name = name;
  pointsAway(matches);
  teams.totalGames += 1;

  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
};

const teamsClassified = (matches: ileaderboard[]) =>
  matches.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (b.goalsFavor !== a.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return b.goalsOwn - a.goalsFavor;
  });

export { teamsHome, teamsAway, teamsClassified };
