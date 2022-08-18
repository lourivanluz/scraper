import puppeteer from "puppeteer";

interface ProductInformation {
  product_id: string;
  title: string;
  img: string;
  price_full: number;
  end_point_product: string;
  description: string;
  total_review: number;
  quantity_stars: number;
  hdd_zise?: object;
}

export const scraper = async (type: string) => {
  const browser = await puppeteer.launch({ headless: "chrome" });
  const page = await browser.newPage();
  await page.goto(
    `https://webscraper.io/test-sites/e-commerce/allinone/computers/${type}`
  );
  //get fist values
  const response = await page.evaluate(async () => {
    const getInformation = (element: Element) => {
      const link = element.querySelector("a")?.getAttribute("href");
      const id = link ? link.split("/").pop() : [0];
      const divRating = element.querySelector("div.ratings");
      const img_element = `https://webscraper.io/${element
        .querySelector("img")
        ?.getAttribute("src")}`;
      const total_review = Number(
        element.querySelector("p.pull-right")?.innerHTML.split(" ")[0]
      );
      const priceFull = Number(
        element.querySelector(".price")?.innerHTML.slice(1)
      );
      const quantity_stars = divRating?.lastElementChild?.childElementCount;

      return {
        product_id: id,
        title: element.querySelector(".title")?.getAttribute("title"),
        img: img_element,
        price_full: priceFull,
        end_point_product: link,
        description: element.querySelector(".description")?.innerHTML,
        total_review: total_review,
        quantity_stars: quantity_stars,
      } as ProductInformation;
    };

    const allThumbnailElement = document.querySelectorAll(".thumbnail");
    const allThumbnail = [...allThumbnailElement];

    const elementLenovo = allThumbnail
      .filter((item) => {
        const title = item.querySelector(".title")?.getAttribute("title");

        if (title && title.includes("Lenovo")) {
          return item;
        }
      })
      .map((item) => getInformation(item));

    return elementLenovo;
  });

  const result: Array<ProductInformation> = [];
  //get second values
  for (let index = 0; index < response.length; index++) {
    const item = response[index];
    await page.goto(`https://webscraper.io/${item.end_point_product}`);

    const hdvalue = await page.evaluate(() => {
      const buttonsElements = document.querySelectorAll(".btn");
      const buttons = [...buttonsElements];

      buttons.forEach((element, index) => {
        const button = element as HTMLElement;
        button.classList.add(`unic${index}`);
      });
      return buttons;
    });

    const hdd = {};
    for (let index = 0; index < hdvalue.length; index++) {
      const xbutton = await page.waitForSelector(`.unic${index}`);
      await xbutton.click();
      const innerKey = await xbutton.evaluate((element) => element.innerHTML);
      const valor = await page.waitForSelector(".price");
      const innerValor = await valor.evaluate((element) =>
        element.innerHTML.slice(1)
      );
      await xbutton.click({ delay: 3 });
      hdd[innerKey] = parseFloat(innerValor);
    }

    result.push({ ...item, hdd_zise: hdd });
  }

  await browser.close();
  return result;
};
