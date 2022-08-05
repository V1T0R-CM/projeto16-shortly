import urlsSchema from "../schemas/urlsSchemas.js";
import { validateToken } from "../token.js";
import connection from "../db/database.js";

export async function postShortenMiddlewareValidation(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const validation = urlsSchema.validate(req.body);
        const { rows :  registers } = await connection.query(`SELECT * FROM url WHERE "fullUrl" = '${req.body.url}'`);

        if (validation.error) {
            return res.sendStatus(422);
        }
        if (registers.length!=0) {
            return res.sendStatus(409);
        }

        if (!validateToken(token)){
            return res.sendStatus(401);
        }
    }
    catch {
        return res.sendStatus(500);
    }
    next();
}

export async function urlIdMiddlewareValidation(req, res, next){
    try{
        const {rows : urlId} = await connection.query(`SELECT * FROM url WHERE id = '${req.params.id}'`);

        if (urlId.length === 0){
            res.sendStatus(404);
        }
    }
    catch{
        res.sendStatus(500)
    }
    next()
}

export async function shortUrlMiddlewareValidation(req, res, next){
    try{
        const {rows : shortUrls} = await connection.query(`SELECT * FROM url WHERE "shortUrl" = '${req.params.shortUrl}'`);

        if (shortUrls.length === 0){
            res.sendStatus(404);
        }
    }
    catch{
        res.sendStatus(500)
    }
    next()
}