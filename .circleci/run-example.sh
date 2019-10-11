cd $1
yarn install # TODO: cache
cp -f /tmp/lib/* ./node_modules/jest-puppeteer-istanbul/lib/
yarn dev &
sleep 15
yarn test
