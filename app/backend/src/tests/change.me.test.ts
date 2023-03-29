import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de integração', () => {
  afterEach(function(){
    sinon.restore();
  })
  const justAteam:Team={

    id:9,
    teamName:'Internacional'
  }as Team;


const severalTeams=[
  {
    id:9,
    teamName:'Internacional'
    
  }as Team,
  {id:10,
  teamName:'Minas Brasília'}as Team
]

  it('testando metodo get da rota /teams', async () => {

    sinon.stub(Model,'findAll').resolves(severalTeams);

    const response= await chai.request(app).get('/teams');

    expect(response.status).to.be.deep.equal(200);

  });
  it('Testando o metodo get da rota /teams:id', async () => {

    sinon.stub(Model,'findOne').resolves(justAteam);

    const response= await chai.request(app).get('/teams/9');

    expect(response.status).to.be.deep.equal(200);

  });
});
