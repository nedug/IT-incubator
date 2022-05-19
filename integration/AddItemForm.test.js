describe('dddddd', () => {
    it('fgfgffgfggfg', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=additemform-component--add-item-form-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
})