import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("should have a title", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Widgets" })).toBeVisible();
});

test("should show a message when there are no widgets", async ({ page }) => {
  await expect(
    page.getByText("No widgets found. Add one above.")
  ).toBeVisible();
});

test("should show a widget when there are widgets", async ({ page }) => {
  await page.getByRole("button", { name: "Add Widget" }).click();

  await expect(page.getByText("Widget #1")).toBeVisible();
});

test("should show multiple widgets when there are widgets", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Add Widget" }).click();

  await expect(page.getByText("Widget #1")).toBeVisible();

  await page.getByRole("button", { name: "Add Widget" }).click();

  await expect(page.getByText("Widget #2")).toBeVisible();

  await checkNumberOfWidgetsInIndexedDb(page, 2);
});

test("clicking the delete button should delete the widget", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Add Widget" }).click();

  await expect(page.getByText("Widget #1")).toBeVisible();

  await page.getByRole("button", { name: "Add Widget" }).click();

  await expect(page.getByText("Widget #2")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).first().click();

  await expect(page.getByText("Widget #1")).not.toBeVisible();

  await checkNumberOfWidgetsInIndexedDb(page, 1);
});

async function checkNumberOfWidgetsInIndexedDb(page: Page, expected: number) {
  const count = await page.evaluate(async () => {
    // @ts-expect-error - accessing bundled module in browser context
    const { db } = await import("/src/lib/db.ts");
    return await db.textWidgets.count();
  });

  expect(count).toBe(expected);
}
