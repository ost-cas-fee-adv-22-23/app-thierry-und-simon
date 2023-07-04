import { test as setup } from '@playwright/test'
const authFile = 'playwright/.auth/user.json'

import * as dotenv from 'dotenv'

dotenv.config()

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.getByTestId('login-button').click()

  const usernameField = page.getByLabel('Loginname')
  await usernameField.fill(process.env.ZITADEL_USERNAME as string)

  await page.click('#submit-button')

  const userPassword = page.getByLabel('Password')
  await userPassword.fill(process.env.ZITADEL_PASSWORD as string)

  await page.click('#submit-button')

  await page.getByText('Hey, was lauft?').isVisible()
  await page.getByTestId('login-profil').isVisible()

  await page.context().storageState({ path: authFile })
})
