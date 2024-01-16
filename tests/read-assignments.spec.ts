import { test } from "@playwright/test";
import { ReadAssignmentsPage } from "../page-objects/read-assignments.page";
import { WikiPage } from "../page-objects/wiki.page";
import { LoginPage } from "../page-objects/login.page";

const options = {
  // your username
  username: "stefan.bley@zeiss.com",
  // timeout for running through all read assignments
  timeout: 3 * 60 * 1000, // 3 minutes
};

test("confirm read assignments", async ({ page }) => {
  test.setTimeout(options.timeout);
  const readAssignmentsPage = new ReadAssignmentsPage(page);

  await readAssignmentsPage.open();

  await new LoginPage(page).login(options.username);

  await readAssignmentsPage.waitToBeDisplayed();
  while (await readAssignmentsPage.hasOpenReadAssignments()) {
    await readAssignmentsPage.clickOnFirstOpenReadAssignment();

    const wikiPage = new WikiPage(page);
    await wikiPage.waitToBeDisplayed();
    await wikiPage.confirmAsRead();

    await readAssignmentsPage.open();
    await readAssignmentsPage.waitToBeDisplayed();
  }
});
