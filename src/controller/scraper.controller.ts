import { Request, Response } from "express";

export const scraperController = (request: Request, response: Response) => {
  return response.status(200).json({ ok: "tudo ok" });
};
