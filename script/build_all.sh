#!/usr/bin/env bash

set -ex

root="$(dirname $0)/.."

cd $root/packages/jest-puppeteer-istanbul
yarn build

cd $root/examples/parcel-example-with-jest-puppeteer
yarn build

cd $root/examples/parcel-example-without-jest-puppeteer
yarn build
