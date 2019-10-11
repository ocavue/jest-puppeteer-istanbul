#!/usr/bin/env node

const fs = require("fs")

function check (path) {
    const raw = fs.readFileSync(path, "utf-8")
    console.log(raw)
    const result = JSON.parse(raw)

    if (result.total.lines.pct !== 100) {
        throw Error(`Wrong result`)
    } else {
        console.log("ok")
    }
}

check(process.env.JSON_PATH)
