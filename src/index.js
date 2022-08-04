import express from 'express';
import router from './routes/index.js';
import dotenv from "dotenv";
import cors from "cors";
import connection from "./db/database.js";
import { generateToken, validateToken} from "./token.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT);