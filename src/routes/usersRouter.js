import { Router } from 'express';
import { getUserMe, getRanking} from '../controllers/usersController.js';
import { userMeMiddlewareValidation } from '../middlewares/usersMiddlewares.js';

const usersRouter = Router();
usersRouter.get("/users/me", userMeMiddlewareValidation, getUserMe)
usersRouter.get("/ranking", getRanking)

export default usersRouter;