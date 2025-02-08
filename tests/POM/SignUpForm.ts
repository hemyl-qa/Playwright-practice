import { expect, Locator, Page } from "@playwright/test";

export default class SignUpForm {
    readonly page: Page; 
    readonly signUpName: Locator;
    readonly signUpLastName: Locator;
    readonly signUpEmail: Locator;
    readonly signUpPassword: Locator;
    readonly signUpRepeatPassword: Locator;
    readonly registerButton: Locator;
    readonly closeFormButton: Locator;
    readonly errorMessage: Locator;
    readonly checkCloseForm: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signUpName = page.locator('#signupName');
        this.signUpLastName = page.locator('#signupLastName');
        this.signUpEmail = page.locator('#signupEmail');
        this.signUpPassword = page.locator('#signupPassword');
        this.signUpRepeatPassword = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.closeFormButton = page.getByText('×');
        this.errorMessage = page.locator('.invalid-feedback');
        this.checkCloseForm = page.locator('.modal-content');

    }

    async registration(email: string, password: string) {
        await this.signUpName.fill('Yaroslav');
        await this.signUpLastName.fill('Bielkin');
        await this.signUpEmail.fill(email);
        await this.signUpPassword.fill(password);
        await this.signUpRepeatPassword.fill(password);
        await this.registerButton.click();
      };
    
      async closeRegistrationForm () {
        await this.closeFormButton.click();
      };
    
      async incorrectName (name: string) {
        await this.signUpName.fill(name);
        await this.signUpName.blur();
      };
      
      async incorrectLastName (lastName: string) {
        await this.signUpLastName.fill(lastName);
        await this.signUpLastName.blur();
      };
      
      async incorrectEmail (email: string) {
        await this.signUpEmail.fill(email);
        await this.signUpEmail.blur();
      };
    
      async incorrectPassword (password: string) {
        await this.signUpPassword.fill(password);
        await this.signUpPassword.blur();
      };
    
      async incorrectRePassword (rePassword: string) {
        await this.signUpRepeatPassword.fill(rePassword);
        await this.signUpRepeatPassword.blur();
      };
      
      async checkForPasswordConsistency (password: string, rePassword: string) {
        await this.signUpPassword.fill(password);
        await this.signUpRepeatPassword.fill(rePassword);
        await this.signUpRepeatPassword.blur();
      };

      async verifyErrorMessageByText (text: string) {
        await expect(this.errorMessage).toHaveText(text);
      };

}
