import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import chalk from "chalk";
import logger from "morgan";
const hostname = "127.0.0.1";
const PORT = 4000;
import dotenv from 'dotenv';
import router from './server/routes/index'

dotenv.config()


mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  
}, console.log("connected to db"));
var db = mongoose.connection;

const app = express();


app.use(logger('dev'));

// middleware - parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

app.get('/', (request, response) => {
  response.status(200).send('The API is working');
  console.log(request.body)
});

const server = http.createServer(app);

server.listen(PORT, hostname, () => {
  console.log(`Server running at` + chalk.blue`(http://${hostname}:${PORT}/)`);
});
