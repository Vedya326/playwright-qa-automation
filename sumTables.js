const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 71; seed <= 80; seed++) {
    const url = `https://sanand0.github.io/tdsdata/table_seed_${seed}.html`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL TOTAL SUM:", totalSum);

  await browser.close();
})();
