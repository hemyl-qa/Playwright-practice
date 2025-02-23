import { test, expect } from '@playwright/test';
import HomePage from '../POM/HomePage';
import SignUpForm from '../POM/SignUpForm';
import { credentials } from '../test-data/userData';
import SignInForm from '../POM/SignInForm';

test.describe('Save state User', ()=> {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let signInForm: SignInForm;
    const email = credentials.userOne.email;
    const password = credentials.userOne.password;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        signInForm = new SignInForm(page);
        await homePage.open();
        await homePage.clickSignUpButton();
        await signUpForm.registration(email, password);
      })

      test('Login with credentials', async ({page}) => {
        await homePage.open();
        await signInForm.signInButton.click();
        await signInForm.loginWithCredentials(email, password);
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await page.context().storageState({ path: 'userOneState.json'});
      });

    

    })