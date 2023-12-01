import { Page } from "@playwright/test";

export class WikiPage {
  private readonly mainUrl = /https:\/\/zdi-wiki.zeiss.com\/(pages|display)\/.+/;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitToBeDisplayed() {
    await this.page.waitForURL(this.mainUrl);
  }

  async confirmAsRead() {
    const confirmButton = this.page.locator("css=.cra-read-button");
    await confirmButton.scrollIntoViewIfNeeded();

    await confirmButton.click();
    await this.page.locator("id=cw-confirm-accept").click();
  }
}
