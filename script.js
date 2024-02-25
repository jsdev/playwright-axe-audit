const { chromium, firefox } = require('playwright');
const AxeBuilder = require('@axe-core/playwright');
const { createHtmlReport } = require('axe-html-reporter');
const fs = require('fs');


//const pki = require('fs').readFileSync('./user.json');

async function runAudit(url) {
  const browserType = process.env.BROWSER || 'chromium';
  const browser = await (browserType === 'chromium' ? chromium : firefox).launch({ headless: true });
//   const context = await browser.newContext({ storageState: JSON.parse(pki.toString()) });
  const context = await browser.newContext({});
  const page = await context.newPage();

  await page.goto(url);
  const failingTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
  const feedbackTags = ['wcag2aaa', 'best-practice'];
  const allTags = failingTags.concat(feedbackTags);

  const results = await new AxeBuilder({ page })
    .withTags(allTags)
    .analyze();

  // Generate report and place it in domain-specific folder
  const domain = new URL(url).hostname;
  const route = new URL(url).pathname.replaceAll('/','_');
  const parts = domain.split('.');
  const reportDir = parts[parts.length-2];
  const path = route === '_' ? 'index' : route.slice(1)

  const options = {
    projectKey: domain + '/'+ path ,
    outputDir: `reports/${reportDir}`,
    reportFileName: `${path}.html`,
    appendToExisting: false
  };

  await createHtmlReport({
    results, 
    options
  });

  await browser.close();
}

(async () => {
  const urls = fs.readFileSync('urls.txt', 'utf-8').split('\n');

  for (const url of urls) {
    // Trim any extra spaces or newline characters
    const trimmedUrl = url.trim();
    if (trimmedUrl.length > 0) {
        await runAudit(url);
    }
  }

  console.log("All audits completed!");
})();
