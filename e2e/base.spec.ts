import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

// Login and navigate to home page befor each test
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.getByTestId('login-button').click()

  const usernameField = page.getByLabel('Loginname')
  await usernameField.fill(process.env.USERNAME || '')

  await page.click('#submit-button')

  const userPassword = page.getByLabel('Password')
  await userPassword.fill(process.env.PASSWORD || '')

  await page.click('#submit-button')

  await page.getByText('Hey, was lauft?').isVisible()
  await page.getByTestId('login-profil').isVisible()
})

// Check if Mumbles are loaded on home afer login
test('mumbles loaded', async ({ page }) => {
  await page.getByTestId('mumbles-write').isVisible()
  await expect(page.getByTestId('mumbles-overview')).toBeVisible()
})

// Test write mumble
test('write mumble', async ({ page }) => {
  const mumbleContent = `E2E Test Thierry-Simon ID: ${Math.round(
    Math.random() * 100000
  )}`
  await page.getByPlaceholder('Deine Meinung zählt!').fill(mumbleContent)
  await page.getByTestId('mumbles-write-submit').click()
  await expect(page.getByText(mumbleContent)).toBeVisible()
})

// Test like a mumble
test('like mumble', async ({ page }) => {
  const likeableMumble = page.getByText('Like', { exact: true }).first()
  await likeableMumble.click()
  const likedMumble = page.getByTestId(mumbleID as string)
  await expect(likedMumble).toHaveText('1 Like')
})

// Test navigate to profil page
test('navigate to profil page', async ({ page }) => {
  await page.getByTestId('login-profil').click()
  await page.waitForURL(/\/profil/)
  await page.getByTestId('user').isVisible()
  await expect(page.getByTestId('user')).toContainText('Test Simon-Thierry')
})

// Test logout
test('logout', async ({ page }) => {
  await page.getByTestId('logout').click()
  await expect(page.getByTestId('logout')).toBeHidden()
})
