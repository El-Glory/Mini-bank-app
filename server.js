import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import chalk from "chalk";
import logger from "morgan";
const hostname = "127.0.0.1";
const PORT = 4000;

const app = express();


app.use(logger('dev'));

// middleware - parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(PORT, hostname, () => {
  console.log(`Server running at` + chalk.blue`(http://${hostname}:${PORT}/)`);
});
