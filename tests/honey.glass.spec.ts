import { test, expect } from '@playwright/test';
import { startPageYamlSnapshot } from './expect-contents/startpage';
import { blogArchivYamlSnapshot } from './expect-contents/blogarchiv';
import { expectTheNeverTypeInTs } from './expect-contents/the-never-type-in-ts';
import { tagsYamlSnapshot } from './expect-contents/tags';

test.beforeEach('Open start URL', async ({ page }) => {
    await page.goto('/');
});

test('Startpage', async ({ page }) => {
    await expect(page).toHaveTitle('honey.glass');
    await expect(page.locator('body')).toMatchAriaSnapshot(startPageYamlSnapshot);

    await page.getByText('The never type in TypeScript').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(expectTheNeverTypeInTs);
});

test('Blog Archive over `View All Posts` link', async ({ page }) => {
    await page.getByText('View All Posts', { exact: true }).click();
    await expect(page).toHaveTitle('Blog | honey.glass');
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('body')).toMatchAriaSnapshot(blogArchivYamlSnapshot);

    await page.getByText('The never type in TypeScript').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(expectTheNeverTypeInTs);
});

test('Blog Archive over `Blog` link', async ({ page }) => {
    await page.getByText('Blog', { exact: true }).click();
    await expect(page).toHaveTitle('Blog | honey.glass');
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('body')).toMatchAriaSnapshot(blogArchivYamlSnapshot);

    await page.getByText('The never type in TypeScript').click();
    await expect(page.locator('body')).toMatchAriaSnapshot(expectTheNeverTypeInTs);
});

test('Tags', async ({ page }) => {
    await page.getByText('Tags').click();
    await expect(page).toHaveTitle('Tags | honey.glass');
    await expect(page).toHaveURL(/\/tags/);
    await expect(page.locator('body')).toMatchAriaSnapshot(tagsYamlSnapshot);
});

test('Article: The never type in TypeScript', async ({ page }) => {
    await page.getByText('The never type in TypeScript').click();
    await expect(page).toHaveTitle('The never type in TypeScript | honey.glass');
    await expect(page).toHaveURL(/\/blog\/the-never-type-in-typescript/);
    await expect(page.locator('body')).toMatchAriaSnapshot(expectTheNeverTypeInTs);
});

// test('Correct font-family is loaded without error and redered correctly', async ({ page }) => {
//
// });
