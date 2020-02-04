const puppeteer = require('puppeteer');
const $ = require('cheerio');

async function scrape(address, callback) {
    const url = 'https://duckduckgo.com/?q=' + address + '+weather&t=ffab&ia=weather';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();

    const temperature = $('.module__temperature-value', html).text();
    const humidity = $('.module__humidity', html).text().substring(10);
    const windspead = $('span.module__winds', html).text();
    const img = 'https://duckduckgo.com' + $('.module__forecast-icon', html).attr('src');
    const location = $('.module__place', html).text();
    const summary = $('.module__summary',html).text();

    await browser.close();

    callback(undefined, {
        temperature,
        humidity,
        windspead,
        image: img,
        location
    });
}

module.exports = scrape;