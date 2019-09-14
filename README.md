# jest-puppeteer-istanbul

<p>
  <a href="http://badge.fury.io/js/jest-puppeteer-istanbul"><img src="https://badge.fury.io/js/jest-puppeteer-istanbul.svg" alt="npm version"></a>
</p>

## Install

```bash
yarn add -D jest-puppeteer-istanbul
// or
npm install -D jest-puppeteer-istanbul
```

## Usage

### [1/3]

Make sure that you have [`jest-puppeteer`](https://github.com/smooth-code/jest-puppeteer) installed and configured.

### [2/3]

Install `babel-plugin-istanbul` and add it to your babel config.

You should **ONLY** use this plugin when you are in development. This plugin will add a lot of code for keeping track of the coverage statements. You definitely won't want them in your final production code.

### [3/3]

Update your Jest configuration:

- Add `jest-puppeteer-istanbul/lib/setup` to `setupFilesAfterEnv`.
- Add `jest-puppeteer-istanbul/lib/reporter` to `reporters`.
- Add `json` to `coverageReporters`. Since the defualt value of `coverageReporters` has `json` inclued, you don't need to change it if you havn't change it.

> If custom reporters are specified, the default Jest reporters will be overridden. To keep default reporters, `default` can be passed as a module name.

A Jest configuration example:
```js
{
  coverageReporters: ["json", "text", "lcov"],
  setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
  reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
  preset: "jest-puppeteer", // Required be `jest-puppeteer`
  collectCoverage: true,
}
```

### Example

Check [this link](https://github.com/ocavue/jest-puppeteer-istanbul/tree/master/example) for a complete example.
