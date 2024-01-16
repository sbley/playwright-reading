import { Page } from "@playwright/test";

export class WikiPage {
  private readonly mainUrl =
    /https:\/\/zdi-wiki.zeiss.com\/(pages|display)\/.+/;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitToBeDisplayed() {
    await this.page.waitForURL(this.mainUrl);
    await this.waitForPageTreeToBeDisplayed();
  }

  async confirmAsRead() {
    const confirmButton = this.page.locator("css=.cra-read-button");
    await confirmButton.scrollIntoViewIfNeeded();

    await confirmButton.click();
    await this.page.locator("id=cw-confirm-accept").click();
    await confirmButton.waitFor({ state: "hidden" });
  }

  async waitForPageTreeToBeDisplayed() {
    await this.page
      .locator(".plugin_pagetree > .plugin_pagetree_children_list")
      .waitFor({ state: "visible" });
  }
}
