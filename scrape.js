const puppeteer = require('puppeteer');

async function openPage() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto('https://www.calameo.com/read/00614912823e04d409ee3');

    // Click the "Accept All" button
    await page.waitForSelector('.btn.btn-accept-all', { visible: true });
    await page.click('.btn.btn-accept-all');


    // Click the button five times
    for (let i = 0; i < 4; i++) {
        await page.waitForSelector('.skin-tag.skin-button.action-right.skin-button-no-label.hide-on-mode-mini', { visible: true });
        await page.click('.skin-tag.skin-button.action-right.skin-button-no-label.hide-on-mode-mini');
        console.log('Page suivante : click', i)
        await new Promise(resolve => setTimeout(resolve, 1 * 1000));

    }

    // Get all div elements with class "page-holder"
    const pageHolderElements = await page.$$('.page-holder');

    // Check if there are at least two div elements

    const firstPageHolderElement = pageHolderElements[0];
    const secondPageHolderElement = pageHolderElements[4];


    // Get the img element within the first div element
    const firstImgElement = await firstPageHolderElement.$('img.page');
    const secondImgElement = await secondPageHolderElement.$('img.page');

    // Get the src link within the first img element
    const firstSrcLink = await firstImgElement.evaluate((element) => element.getAttribute('src'));
    const secondSrcLink = await secondImgElement.evaluate((element) => element.getAttribute('src'));

    console.log('first link :', firstSrcLink)
    console.log('second link', secondSrcLink)

    let link = firstSrcLink.startsWith('https:') ? firstSrcLink : `https:${firstSrcLink}`;

    //console.log(link)
    console.log('evaluation ok')

    // Click the link
    await page.goto(link);

    await new Promise(resolve => setTimeout(resolve, 5 * 1000));

    await page.goBack() ;

    link = secondSrcLink.startsWith('https:') ? secondSrcLink : `https:${secondSrcLink}`;

    // Click the link
    await page.goto(link);

    // Wait for the SVG element to be available
    await page.waitForSelector('svg');

    // Extract the text content of the element
    const name_club = await page.$eval('svg > text:nth-child(17)', (element) => element.textContent);

    console.log(name_club);


    await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000));

    // Take a screenshot of the page (optional)
    await page.screenshot({ path: 'page.png' });

    // Close the browser
    await browser.close();
}

openPage().catch((error) => console.error(error));
