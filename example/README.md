## Install

```bash
yarn install
```

## Run

Run `yarn dev` in one terminal window and run `yarn test` in another. You should see the result as below:

```
 PASS  test/primeDeco.test.js
 PASS  test/fibonacci.test.js
--------------|----------|----------|----------|----------|-------------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------|----------|----------|----------|----------|-------------------|
All files     |    57.89 |       50 |       25 |    55.56 |                   |
 fibonacci.js |        0 |        0 |        0 |        0 |... 10,13,14,15,16 |
 primeDeco.js |      100 |      100 |      100 |      100 |                   |
--------------|----------|----------|----------|----------|-------------------|

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        4.295s
Ran all test suites.
--------------|----------|----------|----------|----------|-------------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------|----------|----------|----------|----------|-------------------|
All files     |      100 |      100 |      100 |      100 |                   |
 fibonacci.js |      100 |      100 |      100 |      100 |                   |
 primeDeco.js |      100 |      100 |      100 |      100 |                   |
--------------|----------|----------|----------|----------|-------------------|
✨  Done in 6.01s.
```
