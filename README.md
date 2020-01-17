# jest-puppeteer-istanbul

<p>
  <a href="http://badge.fury.io/js/jest-puppeteer-istanbul"><img src="https://badge.fury.io/js/jest-puppeteer-istanbul.svg" alt="npm version"></a>
  <a href="https://circleci.com/gh/ocavue/jest-puppeteer-istanbul/tree/master"><img src="https://circleci.com/gh/ocavue/jest-puppeteer-istanbul/tree/master.svg?&style=shield" alt="Build Status"></a>
</p>

## Install

```bash
yarn add -D jest-puppeteer-istanbul
// or
npm install -D jest-puppeteer-istanbul
```

## Configure

### [1/4]

Make sure that you have [jest](https://github.com/facebook/jest) and [babel](https://github.com/babel/babel) installed and configured.

### [2/4]

Install `babel-plugin-istanbul` and add it to your babel config.

You should **ONLY** use this plugin when you are in development mode. This plugin will add a lot of code for keeping track of the coverage statements. You definitely won't want them in your final production code.

### [3/4]

Update your Jest configuration:

- Add `json` to `coverageReporters`. Since the defualt value of `coverageReporters` has `json` inclued, you don't need to change `coverageReporters` if you havn't specify it.
- Add `jest-puppeteer-istanbul/lib/setup` to `setupFilesAfterEnv`.
- Add `jest-puppeteer-istanbul/lib/reporter` to `reporters`.

Notice:

> If custom reporters are specified, the default Jest reporters will be overridden. To keep default reporters, `default` can be passed as a module name.

A Jest configuration example:
```js
{
  coverageReporters: ["json", "text", "lcov"],
  setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
  reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
  collectCoverage: true,
}
```

### [4/4]

`jest-puppeteer-istanbul` need to access puppeteer page from global variables to get coverage information. If you use [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer), jest-puppeteer will do it for you. However, if you project don't use it, you need to do it yourself, like below:

```js
describe("E2E Tests", () => {
    beforeAll(async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      global.page = page
    })

    test(async () => { /*your test code*/ })
})
```

## Examples

Check [this link](https://github.com/ocavue/jest-puppeteer-istanbul/tree/master/examples) for complete examples.
