import { Page, test } from "@playwright/test";
import { ReadAssignmentsPage } from "../page-objects/read-assignments.page";
import { WikiPage } from "../page-objects/wiki.page";

async function login(page: Page) {
  const emailInput = page.locator("css=.sign-in-box input[type=email]");
  await emailInput.fill("stefan.bley@zeiss.com");

  const nextButton = page.locator("css=.sign-in-box input[type=submit]");
  await nextButton.click();
}

test("confirm read assignments", async ({ page }, testInfo) => {
  const readAssignmentsPage = new ReadAssignmentsPage(page);

  await readAssignmentsPage.open();

  await login(page);

  await readAssignmentsPage.waitToBeDisplayed();
  while (await readAssignmentsPage.hasOpenReadAssignments()) {
    await readAssignmentsPage.clickOnFirstOpenReadAssignment();

    const wikiPage = new WikiPage(page);
    await wikiPage.waitToBeDisplayed();
    await wikiPage.confirmAsRead();

    await readAssignmentsPage.open();
  }
});
