#!/usr/bin/env bash

root=$(pwd)
cd $1
yarn install
cp -f /tmp/lib/* ./node_modules/jest-puppeteer-istanbul/lib/
yarn dev &
sleep 15
yarn test
JSON_PATH='./coverage_result/coverage-summary.json' root/.circleci/check-example-result.js
