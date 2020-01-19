#!/usr/bin/env bash

set -euxo pipefail # https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/


cd $(dirname $0)/../examples/$EXAMPLE_NAME
yarn dev &

sleep 15
yarn test
cp ./coverage/coverage-summary.json $COVERAGE_JSON_PATH

# Kill server
kill %1