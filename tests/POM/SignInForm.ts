import { expect, Locator, Page } from "@playwright/test";

export default class SignInForm {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByText('Sign In');
        this.loginField = page.locator('#signinEmail');
        this.passwordField = page.locator('#signinPassword');
        this.loginButton = page.getByText('Login');
    }

    async loginWithCredentials(email: string, password: string) {
        await this.loginField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}