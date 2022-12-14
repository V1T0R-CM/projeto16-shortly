import connection from "../db/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export async function getUserMe(req, res) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        
        const {rows : me } = await connection.query(`
        SELECT users.id as id, users.name as name, SUM(url."visitCount") as "visitCount", json_agg(json_build_object('id', url.id, 'shortUrl', url."shortUrl", 'url', url."fullUrl", 'visitCount', url."visitCount")) as "shortenedUrls"
        FROM url
        JOIN users ON url."userId" = users.id
        WHERE users.email = '${jwt.verify(token, jwtSecretKey).email}'
        GROUP BY users.id`
        );
        res.status(200).send(me)
    }
    catch {
        res.sendStatus(500)
    }
}

export async function getRanking(req, res){
    try {
        const {rows : ranking } = await connection.query(`
        SELECT users.id as id, users.name as name, COUNT(url."userId") as "linksCount", SUM(url."visitCount") as "visitCount"
        FROM users
        LEFT JOIN url ON url."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount"`
        );
    res.status(200).send(ranking.map(user => user.visitCount ? user : {...user, visitCount:0}))
    }
    catch {
        res.sendStatus(500)
    }
}