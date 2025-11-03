import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("Login sucessful", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User successfully logged in!")).toBeVisible();
});

test("Blocked account", async ({ page }) => {
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill("testblock");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User blocked!")).toBeVisible();
});

test("Invalid user", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Type your username" }).fill("tests");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User not found!")).toBeVisible();
});

test("Wrong password", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Incorrect username or password!")).toBeVisible();
});

test("Wrong password 3 times", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password1");

  await page.getByRole("button", { name: "Login" }).click({ clickCount: 3 });

  await expect(page.getByText("User temporarily blocked!")).toBeVisible();
});
