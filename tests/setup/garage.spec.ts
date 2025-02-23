import { test } from '../test-data/fixtures/userGaragePage';
import { expect } from '@playwright/test';

test.describe('Save state User', ()=> {
    test.skip('Open Garage Page', async ({ useState }) => {
        await useState.goto('https://qauto.forstudy.space/panel/garage');
        await expect(useState.getByText('My profile')).toBeVisible();

    })

    
})