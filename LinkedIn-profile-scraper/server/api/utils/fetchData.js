import puppeteer from "puppeteer";
import fs from "fs/promises"

export async function fetchData(link) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const cookiesString = await fs.readFile('./api/utils/cookies.json')
    const cookies = JSON.parse(cookiesString)

    await page.setCookie(...cookies)

    await page.goto(link, { waitUntil: "domcontentloaded" })
    const regex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/

    let name = (await page.$eval('title', e => e.textContent)).match(regex)[1];
    const about = await page.$eval('#about~div:nth-of-type(3)>div>div>div>span', e => e.textContent);
    const location = await page.$eval('.mt2.relative>div:nth-of-type(2)>span', e => e.textContent);
    const connectionCount = await page.$eval('.mt2.relative~ul>li>span', e => e.textContent);
    const followerCount = await page.$eval('#content_collections~div>div>div>div>p>span', e => e.textContent);
    const obj = { "Name": name, "About": about, "Location": location.trim().replace(/\n\s+/g, ''), "Connections": connectionCount.trim().replace(/\n\s+/g, ''), "followers": followerCount }
    await browser.close();
    return obj;
}
