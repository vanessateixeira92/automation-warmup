import { test, expect } from "@playwright/test";
import { USERS, MESSAGES } from "./data/form.js";

test.describe("Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/form");
  });

  for (const user of USERS) {
    const title = `Form submission - ${user.name}, ${user.country}, ${user.gender}`;

    test(title, async ({ page }) => {
      await test.step("Fill and submit the form", async () => {
        await page.getByRole("textbox", { name: "Name *" }).fill(user.name);
        await page.getByRole("textbox", { name: "Email *" }).fill(user.email);
        await page
          .getByRole("textbox", { name: "Password *" })
          .fill(user.password);

        await page.getByLabel("Country *").selectOption(user.country);

        await page
          .locator(`input[type="radio"][value="${user.gender}"]`)
          .check();
      });

      await test.step("Select hobbies (if any)", async () => {
        for (const hobby of user.hobbies || []) {
          await page.getByRole("checkbox", { name: hobby }).check();
        }
      });

      await test.step("Submit the form", async () => {
        await page.getByRole("button", { name: "Send" }).click();
      });

      await test.step("Check success message", async () => {
        await expect(page.getByText(MESSAGES.success.message1)).toBeVisible();
        await expect(page.getByText(MESSAGES.success.message2)).toBeVisible();
      });
    });
  }
});
