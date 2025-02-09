import { test, expect } from '@playwright/test';
import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import { credentials } from '../test-data/userData';


test.describe('Testing the Sign Up form', ()=> {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        await homePage.open();
        await homePage.clickSignUpButton();
      })

      test('Registration', async ({page}) => {
        await signUpForm.registration(credentials.userOne.email, credentials.userOne.password)
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
      });

      test('Close registration form', async () => {
        await signUpForm.closeFormButton.click();
        await expect(signUpForm.checkCloseForm).toBeVisible();
      });
    
      test('Empty Name field', async () => {
        await signUpForm.incorrectName('');
        await signUpForm.verifyErrorMessageByText('Name required');
      });

      test('Name length validation (min)', async () => {
        await signUpForm.incorrectName('q');
        await signUpForm.verifyErrorMessageByText('Name has to be from 2 to 20 characters long');
      });
    
      test('Name length validation (max)', async () => {
        await signUpForm.incorrectName('qwertyuiopasdfghjklzx');
        await signUpForm.verifyErrorMessageByText('Name has to be from 2 to 20 characters long');
      });
    
      test('Name validation', async () => {
        await signUpForm.incorrectName('@#$');
        await signUpForm.verifyErrorMessageByText('Name is invalid');
      });
    
      test('Empty Last name field', async () => {
        await signUpForm.incorrectLastName('');
        await signUpForm.verifyErrorMessageByText('Last name required');
      });
    
      test('Last name length validation (min)', async () => {
        await signUpForm.incorrectLastName('q');
        await signUpForm.verifyErrorMessageByText('Last name has to be from 2 to 20 characters long');
      });

      test('Last name length validation (max)', async () => {
        await signUpForm.incorrectLastName('qwertyuiopasdfghjklzx');
        await signUpForm.verifyErrorMessageByText('Last name has to be from 2 to 20 characters long');
      });
      
      test('Last name validation', async () => {
        await signUpForm.incorrectLastName('@#$');
        await signUpForm.verifyErrorMessageByText('Last name is invalid');
      });
    
      test('Empty Email field', async () => {
        await signUpForm.incorrectEmail('');
        await signUpForm.verifyErrorMessageByText('Email required');
      });

      test('Email without @', async () => {
        await signUpForm.incorrectEmail('qwgmail.com');
        await signUpForm.verifyErrorMessageByText('Email is incorrect');
      });
    
      test('Email with two @', async () => {
        await signUpForm.incorrectEmail('qw@@gmail.com');
        await signUpForm.verifyErrorMessageByText('Email is incorrect');
      });

      test('Email without . in the domain name', async () => {
        await signUpForm.incorrectEmail('qw@gmailcom');
        await signUpForm.verifyErrorMessageByText('Email is incorrect');
      });
    
      test('Email without a domain name', async () => {
        await signUpForm.incorrectEmail('qw@gmail.');
        await signUpForm.verifyErrorMessageByText('Email is incorrect');
      });
    
      test('Empty Password field', async () => {
        await signUpForm.incorrectPassword('');
        await signUpForm.verifyErrorMessageByText('Password required');
      });

      test('Password length validation (min)', async () => {
        await signUpForm.incorrectPassword('Qw1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Password length validation (max)', async () => {
        await signUpForm.incorrectPassword('Qwertyuiopasdfg1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Password without number', async () => {
        await signUpForm.incorrectPassword('Qwertyuiopasd');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Password without letter', async () => {
        await signUpForm.incorrectPassword('123456789');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Password without a lowercase letter', async () => {
        await signUpForm.incorrectPassword('QWERTYUI1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Password without a capital letter', async () => {
        await signUpForm.incorrectPassword('qwertyui1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Empty Re-enter password field', async () => {
        await signUpForm.incorrectRePassword('');
        await signUpForm.verifyErrorMessageByText('Re-enter password required');
      });
    
      test('Re-enter password length validation (min)', async () => {
        await signUpForm.incorrectRePassword('Qwe');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Re-enter password length validation (max)', async () => {
        await signUpForm.incorrectRePassword('Qwertyuiopasdfg1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Re-enter password without number', async () => {
        await signUpForm.incorrectRePassword('Qwertyuiopasd');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Re-enter password without letter', async () => {
        await signUpForm.incorrectRePassword('123456789');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Re-enter password without a lowercase letter', async () => {
        await signUpForm.incorrectRePassword('QWERTYUI1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Re-enter password without a capital letter', async () => {
        await signUpForm.incorrectRePassword('qwertyui1');
        await signUpForm.verifyErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      });
    
      test('Check for password consistency', async () => {
        await signUpForm.checkForPasswordConsistency('Qwer3456', 'Rewq5432');
        await signUpForm.verifyErrorMessageByText('Passwords do not match');
      });

})