import { test, expect } from "@playwright/test";
import { USERS, MESSAGES } from "../data/login.js";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("Login sucessful", async ({ page }) => {
    await test.step("Fill valid credentials and submit", async () => {
      await page
        .getByRole("textbox", { name: "Type your username" })
        .fill(USERS.valid.username);
      await page
        .getByRole("textbox", { name: "Type your password" })
        .fill(USERS.valid.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Validate successful login messages", async () => {
      await expect(page.getByText(MESSAGES.success.login)).toBeVisible();
      await expect(
        page.getByText(MESSAGES.success.authenticated(USERS.valid.username))
      ).toBeVisible();
    });

    await test.step("Logout and validate logout message", async () => {
      await page.getByRole("button", { name: "Logout" }).click();
      await expect(page.getByText(MESSAGES.success.logout)).toBeVisible();
    });
  });

  test("Blocked account", async ({ page }) => {
    await test.step("Fill blocked user credentials and submit", async () => {
      await page
        .getByRole("textbox", { name: "Type your username" })
        .fill(USERS.blocked.username);
      await page
        .getByRole("textbox", { name: "Type your password" })
        .fill(USERS.blocked.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Validate blocked user message", async () => {
      await expect(page.getByText(MESSAGES.errors.blocked)).toBeVisible();
    });
  });

  test("Invalid user", async ({ page }) => {
    await test.step("Fill non-existing/invalid account and submit", async () => {
      await page
        .getByRole("textbox", { name: "Type your username" })
        .fill(USERS.invalid.username);
      await page
        .getByRole("textbox", { name: "Type your password" })
        .fill(USERS.invalid.password);
      await page.getByRole("button", { name: "Login" }).click();
    });
    await test.step("Validate invalid account error message", async () => {
      await expect(page.getByText(MESSAGES.errors.invalid)).toBeVisible();
    });
  });

  test("Wrong password", async ({ page }) => {
    await test.step("Fill valid username with wrong password and submit", async () => {
      await page
        .getByRole("textbox", { name: "Type your username" })
        .fill(USERS.wrongPassword.username);
      await page
        .getByRole("textbox", { name: "Type your password" })
        .fill(USERS.wrongPassword.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Validate wrong password error message", async () => {
      await expect(page.getByText(MESSAGES.errors.wrongPassword)).toBeVisible();
    });
  });

  test("Wrong password 3 times", async ({ page }) => {
    await test.step("Fill username and wrong password", async () => {
      await page
        .getByRole("textbox", { name: "Type your username" })
        .fill(USERS.wrongPassword.username);
      await page
        .getByRole("textbox", { name: "Type your password" })
        .fill(USERS.wrongPassword.password);
    });

    await test.step("Submit wrong password 3 consecutive times", async () => {
      for (let i = 0; i < 3; i++) {
        await page.getByRole("button", { name: "Login" }).click();
      }
    });

    await test.step("Validate user temporarily blocked message", async () => {
      await expect(
        page.getByText(MESSAGES.errors.tooManyAttempts)
      ).toBeVisible();
    });
  });
});
