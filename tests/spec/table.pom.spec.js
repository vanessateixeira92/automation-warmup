// @ts-check
import { test, expect } from "@playwright/test";
import hpCharacters from "../data/json/hpCharacters.json";
import { HpTablePage } from "../pages/hpTablePage";

for (const c of hpCharacters) {
  test("Character " + c.name, async ({ page }) => {
    await page.goto("/table");
    const hpTablePage = new HpTablePage(page);
    await hpTablePage.goToTable();
    await hpTablePage.validateCharacterData(c);
  });
}
