import { Request, Response } from "express";
import { scraper } from "../services";

export const scraperController = async (_: Request, response: Response) => {
  const laptops = await scraper("laptops");
  const tablets = await scraper("tablets");

  const result = {
    laptops: laptops.sort((a, b) => a.price_full - b.price_full),
    tablets: tablets.sort((a, b) => a.price_full - b.price_full),
  };
  return response.status(200).json(result);
};
