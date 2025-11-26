import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';


async function globalSetup(config: FullConfig) {
  const allureResultsPath = path.join(__dirname, 'allure-results');

  // Create allure-results folder if it doesn't exist
  if (!fs.existsSync(allureResultsPath)) {
    fs.mkdirSync(allureResultsPath);
  }

  // Write environment.properties
  const envProps = `
Browser=Chrome
Environment=Local
ExecutedBy=Saifi Azmi
Framework=Playwright + TypeScript
ReportModule=Advanced Return Analysis
  `.trim();

  fs.writeFileSync(path.join(allureResultsPath, 'environment.properties'), envProps);

  // Write categories.json
  const categories = [
    {
      name: 'Assertion Errors',
      matchedStatuses: ['failed'],
      messageRegex: '.*AssertionError.*'
    },
    {
      name: 'Timeouts',
      matchedStatuses: ['broken'],
      messageRegex: '.*Timeout.*'
    }
  ];

  fs.writeFileSync(
    path.join(allureResultsPath, 'categories.json'),
    JSON.stringify(categories, null, 2)
  );
}

export default globalSetup;
