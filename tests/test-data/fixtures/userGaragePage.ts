import { test as base } from '@playwright/test';

type authorizationWithState = {
    useState: any,
}

export const test = base.extend<authorizationWithState>({
    useState: async ({ browser }, use) => {
            const context = await browser.newContext({
              storageState: 'userOneState.json'
            });
            const page = await context.newPage();
            await use(page);
    }
})