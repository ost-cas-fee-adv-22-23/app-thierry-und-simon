import { test, expect } from '@playwright/test'

test('get started link', async ({ page }) => {
  await page.goto('https://app-thierry-und-simon.vercel.app/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Login' }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/)
})

test('check h1 content', async ({ page }) => {
  await page.goto('https://app-thierry-und-simon.vercel.app/')
  const h1Content = (await page.locator('.mb-xs h1').innerText()).includes(
    'Mumble'
  )
  expect(h1Content).toBe(true)
})

test('mumbles loaded', async ({ page }) => {
  await page.goto('https://app-thierry-und-simon.vercel.app/')
  const h1Content = (await page.locator('.mb-xs h1').innerText()).includes(
    'Mumble'
  )
  expect(h1Content).toBe(true)
})
