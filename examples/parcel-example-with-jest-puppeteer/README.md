# An example of jest-puppeteer-istanbul

In this example, `src/fibonacci.js` will be tested by an e2e test and `src/primeDeco.js` will be covered by a unit test. With `jest-puppeteer-istanbul`, Jest can collect and combine their coverage information.

## Install

```bash
yarn install
```

## Run

Run `yarn dev` in one terminal window and run `yarn test` in another. You should see the result as below:

```
 PASS  test/primeDeco.test.js
 PASS  test/fibonacci.test.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        4.718s
Ran all test suites.
--------------|----------|----------|----------|----------|-------------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------|----------|----------|----------|----------|-------------------|
All files     |      100 |      100 |      100 |      100 |                   |
 fibonacci.js |      100 |      100 |      100 |      100 |                   |
 primeDeco.js |      100 |      100 |      100 |      100 |                   |
--------------|----------|----------|----------|----------|-------------------|
```
