import { expect, Page } from "@playwright/test";

export class ReadAssignmentsPage {
  private readonly url = "https://zdi-wiki.zeiss.com/users/readack/view.action";
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(this.url);
  }

  async waitToBeDisplayed() {
    await this.page.waitForURL(this.url);
  }

  async clickOnFirstOpenReadAssignment() {
    await this.getFirstOpenReadAssignment().getByRole("link").click();
  }

  async hasOpenReadAssignments() {
    return this.getFirstOpenReadAssignment().isVisible();
  }

  private getFirstOpenReadAssignment() {
    const table = this.page.locator("css=#readAckProfileReport table tbody");
    return table.locator("css=tr:first-of-type[id]");
  }
}
