import { Request, Response } from "express";
import { scraper } from "../services";

export const scraperController = async (
  request: Request,
  response: Response
) => {
  const agora = new Date();
  const laptops = await scraper("laptops");
  const tablets = await scraper("tablets");

  const result = {
    laptops: laptops.sort((a, b) => a.price_full - b.price_full),
    tablets: tablets.sort((a, b) => a.price_full - b.price_full),
  };
  const conta = new Date();

  console.log(`terminou em ${Number(conta) - Number(agora)}ms`);

  return response.status(200).json(result);
};
