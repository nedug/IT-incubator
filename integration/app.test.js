/* eslint-disable */

describe('App', () => {
    it('AddItemForm', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });

    it('EditableSpan', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('TaskIsNotDone', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('App', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=app-app--app-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});
