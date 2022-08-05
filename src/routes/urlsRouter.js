import { Router } from 'express';
import { postShorten, getUrlId, openShortUrl} from '../controllers/urlsControllers.js';
import { postShortenMiddlewareValidation, urlIdMiddlewareValidation, shortUrlMiddlewareValidation } from '../middlewares/urlsMiddlewares.js';

const urlsRouter = Router();
urlsRouter.get("/urls/:id", urlIdMiddlewareValidation, getUrlId)
urlsRouter.get("/urls/open/:shortUrl", shortUrlMiddlewareValidation, openShortUrl)
urlsRouter.post("/urls/shorten", postShortenMiddlewareValidation, postShorten);

export default urlsRouter;