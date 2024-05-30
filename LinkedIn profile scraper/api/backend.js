import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import puppeteer from 'puppeteer';
import mongoose from "mongoose";
import { userDetails } from "./model.js";
import fs from "fs/promises"

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // middleware which fetches the form data
app.use(cors()); //for cross generation support
const CONNNECTIONSTRING = "mongodb+srv://mukul:8368555400@dribbblecluster.xnwg76a.mongodb.net/LinkdInDB?retryWrites=true&w=majority&appName=dribbblecluster";
function connectToDatabase() {
    //make sure that server open only when database is available
    return new Promise((resolve, reject) => {
        mongoose
            .connect(CONNNECTIONSTRING)
            .then(() => {
                resolve("Connected successfully to Database");
            })
            .catch((err) => {
                console.log(err)
                reject(`Database unreachable`);
            });
    });
}
async function fetchData(link) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const cookiesString = await fs.readFile('./cookies.json')
    const cookies = JSON.parse(cookiesString)
    await page.setCookie(...cookies)
    await page.goto(link, { waitUntil: "domcontentloaded" })

    await page.waitForSelector('.text-heading-xlarge');
    await page.waitForSelector('#about~div:nth-of-type(3)>div>div>div>span');
    await page.waitForSelector('.mt2.relative>div:nth-of-type(2)>span');
    await page.waitForSelector('#content_collections~div>div>div>div>p>span');
    await page.waitForSelector('#content_collections~div>div>div>div>p>span');



    const name = await page.$eval('.text-heading-xlarge', e => e.textContent);
    const about = await page.$eval('#about~div:nth-of-type(3)>div>div>div>span', e => e.textContent);
    const location = await page.$eval('.mt2.relative>div:nth-of-type(2)>span', e => e.textContent);
    const connectionCount = await page.$eval('.mt2.relative~ul>li>span', e => e.textContent);
    const followerCount = await page.$eval('#content_collections~div>div>div>div>p>span', e => e.textContent);
    const obj = { "Name": name, "About": about, "Location": location.trim().replace(/\n\s+/g, ''), "Connections": connectionCount.trim().replace(/\n\s+/g, ''), "followers": followerCount }
    await browser.close();
    return obj;
}

app.post("/user-data", async (req, res) => {
    try {
        const link = req.query.id;
        const userData = await fetchData(link)
        const userObj = new userDetails(userData);

        userObj.save()
            .then(() => {
                res.status(201).json({ msg: "Success" });
            })
            .catch((error) => {
                res.status(500)
                    .json({ error: `Error saving data: ${error.message}` });

            });
    }
    catch {
        res.status(404).json({ msg: "failed to post" });
    }


})
app.get("/fetch-all", (req, res) => {
    userDetails.find({})
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.send("something went wrong")
        });
})


app.listen(port, () => {
    connectToDatabase()
        .then((msg) => {
            console.log(msg);
            console.log(`server starting runining on port ${port}`);
        })
        .catch((err) => {
            console.log(err);
        });
});