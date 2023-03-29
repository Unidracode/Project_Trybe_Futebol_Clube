import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.getAll(req, res));
teamRouter.get('/:id', (req, res) => teamController.getById(req, res));

export default teamRouter;
