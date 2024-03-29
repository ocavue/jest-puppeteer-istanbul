# jest-puppeteer-istanbul

> Using Playwright? Check https://github.com/ccpu/jest-playwright-istanbul, which is a fork of this project.

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

Make sure that you have [Jest](https://github.com/facebook/jest) and [Babel](https://github.com/babel/babel) installed and configured.

### [2/4]

Install [`babel-plugin-istanbul`](https://www.npmjs.com/package/babel-plugin-istanbul) and add it to your Babel config.

You should **ONLY** use this plugin when you are in development mode. This plugin will add a lot of code for keeping track of the coverage statements. You definitely won't want them in your final production code.

Babel configuration examples:

```javascript
// .babelrc.js

const plugins = [ /* Your babel plugins */ ]
if (process.env.NODE_ENV === "development") {
  plugins.push("istanbul")
}
module.exports = {
  plugins: plugins
}
```

```json5
// babel.config.json

{
  "plugins": [
    // Your babel plugins
  ],
  "env": {
    "development": {
      "plugins": [
         "istanbul"
      ]
    }
  }
}
```

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

`jest-puppeteer-istanbul` need to access puppeteer page from global variable `page` to get coverage information. If you use [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer), jest-puppeteer will do it for you and you can skip this step. Otherwise you need to do it yourself, like below:

```js
beforeAll(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    global.page = page
})
describe("E2E Tests", () => {
    test(async () => { /* Your test code */ })
})
```

## Examples

Check [this link](https://github.com/ocavue/jest-puppeteer-istanbul/tree/master/examples) for complete examples.

## Troubleshooting

If you can't get the code coverage correctly when using the Jest from [IntelliJ IDEA](https://www.jetbrains.com/help/idea/running-unit-tests-on-jest.html) or [WebStorm](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_jest_running_tests), that's because the IDE ignores `jest-puppeteer-istanbul/lib/reporter` in the `jest.config.js` in favour of its own Jest reporter. You can add `--reporters jest-puppeteer-istanbul/lib/reporter` in your IDE's Jest configuration like below to fix this.

![IDEA config](https://user-images.githubusercontent.com/24715727/102864414-0b811680-446f-11eb-8c5a-46e0e5f114cb.png)
