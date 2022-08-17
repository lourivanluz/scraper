import { Router } from "express";
import { scraperController } from "../../controller";

const scraperRouter = Router();

scraperRouter.get("", scraperController);

export default scraperRouter;
