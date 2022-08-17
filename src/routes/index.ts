import { Router } from "express";
import scraperRouter from "./scraper";

const routes = Router();

routes.use("/scraper", scraperRouter);

export default routes;
