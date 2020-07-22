import { Router } from 'express';
import SessionsController from '../controllers/sessions-controller';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.signin);

export default sessionsRouter;
