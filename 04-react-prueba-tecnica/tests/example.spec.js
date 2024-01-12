// @ts-check
import { test, expect } from "@playwright/test";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
const LOCALHOST_URL = "http://localhost:5173/";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL); //nos conectamos a nuestro local

  const text = await page.getByRole("paragraph"); //buscamos la etiqueta <p></p>
  const image = await page.getByRole("img"); //buscamos la <img>

  const textContent = await text.textContent(); //vamos a ir al contenido
  const imageSrc = await image.getAttribute("src"); //buscamos el src

  await expect(textContent?.length).toBeGreaterThan(0); //que el texto sea de longitud mayor a 0
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy(); //que sea igual al endpoint
});
