import test from "@playwright/test";
import { FormPage } from "../pages/form.page.js";
import { USERS, FORM_MESSAGES, ERROR_MESSAGES } from "../data/users.js";

test.describe("Forms", () => {
  for (const user of USERS) {
    test(`${user.scenario} | ${user.name} | ${user.countryLabel} | ${user.gender}`, async ({
      page,
    }) => {
      const form = new FormPage(page);

      await form.goToForm();
      await form.fillRequiredFields(user);
      await form.selecHobbies(user.hobbies);
      await form.submitForm();
      await form.validateSuccess(FORM_MESSAGES);
    });
  }
});

test.describe("FORM - ERROR", () => {
  test("Required validation messages (empty form)", async ({ page }) => {
    const form = new FormPage(page);
    await form.goToForm();
    await form.submitForm();
    await form.validateRequiredErrors(ERROR_MESSAGES);
  });
});
