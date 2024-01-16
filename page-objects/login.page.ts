import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string) {
    const emailInput = this.page.locator("css=.sign-in-box input[type=email]");
    await emailInput.fill(username);

    const nextButton = this.page.locator("css=.sign-in-box input[type=submit]");
    await nextButton.click();
  }
}
