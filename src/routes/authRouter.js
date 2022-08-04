import { Router } from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import {registerMiddlewareValidation, loginMiddlewareValidation} from '../middlewares/authMiddlewares.js';

const authRouter = Router();
authRouter.post("/signup", registerMiddlewareValidation, signUp);
authRouter.post("/signin", loginMiddlewareValidation, signIn);

export default authRouter;