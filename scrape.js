const puppeteer = require('puppeteer');

async function openPage() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    /*
    const ignoredPatterns = [/^[LESCUB]*$/, /^NC$/, /^[a-z]/, /^U\d+/, /Équipes/, /Secrétaire/, /Resp./, /FootLoisir/, /Membresclub/, /é/, /,/];
    const ignoredLetters = ignoredPatterns.append([/[a-z]/,/[A-Z]/]);
    const mailPattern = [/@/] ;
    const clubPattern = [/[A-Z]/] ;
    const jsonData = [];
     */

    for (let i = 9 ; i <= 52 ; i ++){
        const url = `https://p.calameoassets.com/221104151109-5586f6e74babea00e613666507e7c361/p${i}.svgz`;

        await page.goto(url) ;
        console.log(`PAGE ${i}`)
        /*


        const elements = await page.$$('svg > text');

        const pageData = {};
        pageData.pageNumber = i;

        let markedPhone1 = false ;
        let markedMail1 = false ;
        let markedMail
        let markedClub = false ;
        let club1 = '' ;
        let club2 = '' ;

        for (let j = 3; j <= elements.length; j++) {
            const selector = `svg > text:nth-child(${j})`;
            const textContent = await page.$eval(selector, element => element.textContent);
            console.log(`${j}: ${textContent}`);

            const key = j.toString();
            const value = textContent.trim();

            if (!markedPhone1){
                if(!ignoredLetters.some((pattern) => pattern.test(value))) {
                    pageData[key] = value;
                    markedPhone = true ;
                }
                if(markedPhone1 && !markedMail1){
                    if(mailPattern.some((pattern) => pattern.test(value))) {
                        pageData[key] = value;
                        markedMail = true ;
                    }
                }
                if (markedMail)

            if (!ignoredPatterns.some((pattern) => pattern.test(value))) {
                pageData[key] = value;
            }
        }
        jsonData.push(pageData) ;
        console.log('============================================');
        console.log(jsonData);

         */

        await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000));
    }


    // Close the browser
    await browser.close();
}

openPage().catch((error) => console.error(error));
