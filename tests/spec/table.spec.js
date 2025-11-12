// @ts-check
import { test, expect } from "@playwright/test";
import hpCharacters from "../data/json/hpCharacters.json";

for (const c of hpCharacters) {
  test("Character " + c.name, async ({ page }) => {
    await page.goto("/table");
    const nameWithoutSpaces = c.name.replace(/\s/g, "");
    await expect(
      page.locator("#tableCharacterName" + nameWithoutSpaces)
    ).toBeVisible();
    await expect(page.getByRole("img", { name: c.name })).toBeVisible();
    await expect(
      page.locator("#tableCharacterHouse" + nameWithoutSpaces)
    ).toBeVisible();

    const birth = c.dateOfBirth ? c.dateOfBirth : "Unknown";
    await expect(page.getByRole("cell", { name: birth })).toBeVisible();
  });
}
