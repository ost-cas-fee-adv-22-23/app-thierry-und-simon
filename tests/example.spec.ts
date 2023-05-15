import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://app-thierry-und-simon.vercel.app/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mumble/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://app-thierry-und-simon.vercel.app/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Login' }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/)
})
