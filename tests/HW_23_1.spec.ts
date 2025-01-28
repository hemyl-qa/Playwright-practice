import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign up' }).click();
})

test.describe('Testing the Sign Up form', () => {
  const email = `aqa-hemyl.qa+${Date.now()}@gmail.com`;
  const password = 'Qwerty12345';
  
  test('Registration', async ({ page }) => {
    await page.locator('#signupName').fill('Yaroslav');
    await page.locator('#signupLastName').fill('Bielkin');
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill(password);
    await page.locator('#signupRepeatPassword').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  });

  test('Close registration form', async ({ page }) => {
    await page.getByText('×').click();
    await expect(page.locator('.modal-content')).toBeVisible();
  });

  test('Empty Name field', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Name required")')).toBeVisible();
  });

  test('Name length validation (min)', async ({ page }) => {
    await page.locator('#signupName').fill('q');
    await page.locator('#signupName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Name has to be from 2 to 20 characters long")')).toBeVisible();
  });

  test('Name length validation (max)', async ({ page }) => {
    await page.locator('#signupName').fill('qwertyuiopasdfghjklzx');
    await page.locator('#signupName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Name has to be from 2 to 20 characters long")')).toBeVisible();
  });

  test('Name validation', async ({ page }) => {
    await page.locator('#signupName').fill('@#$');
    await page.locator('#signupName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Name is invalid")')).toBeVisible();
  });

  test('Empty Last name field', async ({ page }) => {
    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Last name required")')).toBeVisible();
  });
  
  test('Last name length validation (min)', async ({ page }) => {
    await page.locator('#signupLastName').fill('q');
    await page.locator('#signupLastName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Last name has to be from 2 to 20 characters long")')).toBeVisible();
  });

  test('Last name length validation (max)', async ({ page }) => {
    await page.locator('#signupLastName').fill('qwertyuiopasdfghjklzx');
    await page.locator('#signupLastName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Last name has to be from 2 to 20 characters long")')).toBeVisible();
  });

  test('Last name validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('@#$');
    await page.locator('#signupLastName').blur();
    await expect(page.locator('.invalid-feedback:has-text("Last name is invalid")')).toBeVisible();
  });

  test('Empty Email field', async ({ page }) => {
    await page.locator('#signupEmail').focus();
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback:has-text("Email required")')).toBeVisible();
  });

  test('Email without @', async ({ page }) => {
    await page.locator('#signupEmail').fill('qwgmail.com');
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback:has-text("Email is incorrect")')).toBeVisible();
  });

  test('Email with two @', async ({ page }) => {
    await page.locator('#signupEmail').fill('qw@@gmail.com');
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback:has-text("Email is incorrect")')).toBeVisible();
  });

  test('Email without . in the domain name', async ({ page }) => {
    await page.locator('#signupEmail').fill('qw@gmailcom');
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback:has-text("Email is incorrect")')).toBeVisible();
  });

  test('Email without a domain name', async ({ page }) => {
    await page.locator('#signupEmail').fill('qw@gmail.');
    await page.locator('#signupEmail').blur();
    await expect(page.locator('.invalid-feedback:has-text("Email is incorrect")')).toBeVisible();
  });

  test('Empty Password field', async ({ page }) => {
    await page.locator('#signupPassword').focus();
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password required")')).toBeVisible();
  });

  test('Password length validation (min)', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qw1');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Password length validation (max)', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qwertyuiopasdfg1');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Password without number', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qwertyuiopasd');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Password without letter', async ({ page }) => {
    await page.locator('#signupPassword').fill('123456789');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Password without a lowercase letter', async ({ page }) => {
    await page.locator('#signupPassword').fill('QWERTYUI1');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Password without a capital letter', async ({ page }) => {
    await page.locator('#signupPassword').fill('qwertyui1');
    await page.locator('#signupPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Empty Re-enter password field', async ({ page }) => {
    await page.locator('#signupRepeatPassword').focus();
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Re-enter password required")')).toBeVisible();
  });

  test('Re-enter password length validation (min)', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('Qwe');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Re-enter password length validation (max)', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('Qwertyuiopasdfg1');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Re-enter password without number', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('Qwertyuiopasd');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Re-enter password without letter', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('123456789');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Re-enter password without a lowercase letter', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('QWERTYUI1');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('Re-enter password without a capital letter', async ({ page }) => {
    await page.locator('#signupRepeatPassword').fill('qwertyui1');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")')).toBeVisible();
  });

  test('heck for password consistency', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qwertyui1');
    await page.locator('#signupRepeatPassword').fill('QWertyui1');
    await page.locator('#signupRepeatPassword').blur();
    await expect(page.locator('.invalid-feedback:has-text("Passwords do not match")')).toBeVisible();
  });

})

    