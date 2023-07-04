import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

test.describe('E2E Mumble', () => {
  // Check if Mumbles are loaded on home afer login
  test('mumbles loaded', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('mumbles-write').isVisible()
    await page.getByTestId('mumbles-list').isVisible()
    await expect(page.getByTestId('mumbles-list')).toBeVisible()
  })

  // Test write mumble
  test('write mumble', async ({ page }) => {
    await page.goto('/')
    const mumbleContent = `E2E Test Thierry-Simon ID: ${Math.round(
      Math.random() * 100000
    )}`
    await page.getByPlaceholder('Deine Meinung zählt!').fill(mumbleContent)
    await page.getByTestId('mumbles-write-submit').click()
    await expect(page.getByText(mumbleContent)).toBeVisible()
  })

  // Test like a mumble
  test('like mumble', async ({ page }) => {
    await page.goto('/')
    const likeableMumble = page.getByText('Like', { exact: true }).first()
    await likeableMumble.click()
    /*const likedMumble = page.getByTestId(mumbleID as string)*/
    await expect(likeableMumble).toHaveText('Like')
  })

  // Test navigate to profil page
  test('navigate to profil page', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('login-profil').click()
    await page.waitForURL(/\/profil/)
    await page.getByTestId('user').isVisible()
    await expect(page.getByTestId('user')).toContainText('Test Simon-Thierry')
  })

  // Test logout
  test('logout', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('logout').click()
    await expect(page.getByTestId('logout')).toBeHidden()
  })
})
