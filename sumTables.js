const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 71; seed <= 80; seed++) {
    const url = `https://sanand0.github.io/tdsdata/table_seed_${seed}.html`;

    await page.goto(url, { waitUntil: "networkidle" });

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  await browser.close();

  // 🔥 IMPORTANT — ONLY THIS LINE SHOULD PRINT
  console.log(totalSum);
})();
