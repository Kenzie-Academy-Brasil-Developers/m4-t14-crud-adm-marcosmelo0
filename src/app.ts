import express, { Application } from "express";
import "express-async-errors";
import { handdleError } from "./errors/handdleError";
import { router } from "./routers/index";

export const app: Application = express();

app.use(express.json());
app.use("", router);

app.use(handdleError);
