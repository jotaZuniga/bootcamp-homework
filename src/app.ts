import express, { Application } from "express"
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"
import { DBConnect } from './db';
import { moviesRouter } from "./routes/routes";

dotenv.config();

const app: Application = express();
const mongoConnect = new DBConnect(process.env.MONGODB_URI, process.env.DB_NAME);

const dbInit = mongoConnect.init();

dbInit.then(()=> console.log('JOSE... DB is up and running'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(moviesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`JOSE ZUNIGA,  your server is running on PORT ${PORT}`)
})