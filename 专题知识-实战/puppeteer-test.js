import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://bilibili.com');
  page.on("request", (req) => {
    console.log("req.headers()", req.headers());
    console.log("req.method()", req.method());
    console.log("postData()", req.postData());
  });

  await browser.close();

})();


