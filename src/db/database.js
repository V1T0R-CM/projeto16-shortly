import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

//const connection = new Pool({
//  host: process.env.DATABASE_SERVER,
//  port: process.env.DATABASE_PORT,
//  user: process.env.DATABASE_USER,
//  password: process.env.DATABASE_PASSWORD,
//  database: process.env.DATABASE_NAME
//});

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
  });

export default connection;