import { expect, test } from "@playwright/test";

export class FormPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole("heading", { name: "Form" });
    this.nameInput = page.getByRole("textbox", { name: "Name *" });
    this.emailInput = page.getByRole("textbox", { name: "Email *" });
    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.countrySelect = page.getByLabel("Country *");
    this.genderRadio = (value) =>
      page.locator(`input[name="gender"][value="${value}"]`);
    this.genderGroup = page.locator("#genderGroup");
    this.sendButton = page.getByRole("button", { name: "Send" });
    this.successTitle = page.getByText("Success!");
    this.successBody = page.getByText("The form has been submitted");
  }

  async goToForm() {
    await test.step("Navigate to form page", async () => {
      await this.page.goto("/form");
      await this.header.waitFor({ state: "visible" });
    });
  }

  async fillRequiredFields(user) {
    await test.step("Fill required fields (incl. gender)", async () => {
      await this.countrySelect.selectOption(user.countryValue);
      await this.nameInput.fill(user.name);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      await this.genderRadio(user.genderValue).check();
    });
  }

  async selecHobbies(userHobbies) {
    this.hobbieCheckBox = (hobby) =>
      this.page.getByRole("checkbox", { name: hobby });
    await test.step("Select hobbies (if any)", async () => {
      for (const hobby of userHobbies) {
        await this.hobbieCheckBox(hobby).check();
      }
    });
  }

  async submitForm() {
    await test.step("Submit form", async () => {
      await this.sendButton.click();
    });
  }

  async validateSuccess(messages) {
    await test.step("Validate success message", async () => {
      await this.page.getByText(messages.successTitle).waitFor();
      await expect(this.page.getByText(messages.successTitle)).toBeVisible();
      await expect(this.page.getByText(messages.successBody)).toBeVisible();
    });
  }
  async validateRequiredErrors(errors) {
    await test.step("Validate required field messages", async () => {
      await expect(this.page.getByText(errors.name)).toBeVisible();
      await expect(this.page.getByText(errors.email)).toBeVisible();
      await expect(this.page.getByText(errors.password)).toBeVisible();
      await expect(this.page.getByText(errors.country)).toBeVisible();
      await expect(this.page.getByText(errors.gender)).toBeVisible();
    });
  }
}
