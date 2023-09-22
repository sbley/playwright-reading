import { test } from "@playwright/test";
import { ReadAssignmentsPage } from "../page-objects/read-assignments.page";
import { WikiPage } from "../page-objects/wiki.page";
import { LoginPage } from "../page-objects/login.page";

test("confirm read assignments", async ({ page }) => {
  const readAssignmentsPage = new ReadAssignmentsPage(page);

  await readAssignmentsPage.open();

  await new LoginPage(page).login("stefan.bley@zeiss.com");

  await readAssignmentsPage.waitToBeDisplayed();
  while (await readAssignmentsPage.hasOpenReadAssignments()) {
    await readAssignmentsPage.clickOnFirstOpenReadAssignment();

    const wikiPage = new WikiPage(page);
    await wikiPage.waitToBeDisplayed();
    await wikiPage.confirmAsRead();

    await readAssignmentsPage.open();
  }
});
