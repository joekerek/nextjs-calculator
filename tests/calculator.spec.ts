import {test, expect} from '@playwright/test'

test.describe('Calculator app', function() {
  test.beforeEach(async function({ page }) {
    await page.goto('/');
  });

  test('Calculates correct value', async function({ page }) {
    await page.locator('button[value="("]').click();
    await page.locator('button[value="5"]').click();
    await page.locator('button[value="+"]').click();
    await page.locator('button[value="5"]').click();
    await page.locator('button[value=")"]').click();
    await page.locator('button[value="="]').click();

    const screen =  page.locator ('.screen');
    await expect(screen).toHaveText('10');
  });

  test("Clears screen content", async function({ page }) {
    await page.locator('button[value="("]').click();
    await page.locator('button[value="5"]').click();
    await page.locator('button[value="+"]').click();
    await page.locator('button[value="5"]').click();
    await page.locator('button[value=")"]').click();
    await page.locator('button[value="C"]').click();
    await page.locator('button[value="("]').click();
    await page.locator('button[value="6"]').click();
    await page.locator('button[value="+"]').click();
    await page.locator('button[value="6"]').click();
    await page.locator('button[value=")"]').click();
    await page.locator('button[value="="]').click();

    const screen =  page.locator ('.screen');
    await expect(screen).toHaveText('12');
  })
})