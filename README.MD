## API simples que busca no site por produtos da marca Lenovo

[Site alvo](https://webscraper.io/test-sites/e-commerce/allinone)

Endpoint da API

- /api/scraper

### GET

    description: Retorna os produtos

#### Body response

```json
{
  "laptops": [],
  "tablets": []
}
```

Cada produto tem a seguites informaçoes

```json
{
  "product_id": string:,
  "title": string,
  "img": string,
  "price_full": number,
  "end_point_product": string,
  "description": string,
  "total_review": number,
  "quantity_stars": number,
  "hdd_zise": {
    key: number,
  }
}
```
