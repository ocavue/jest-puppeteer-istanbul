const cp = require("child_process")
const path = require("path")
const fs = require("fs")

const bashScript = path.join(__dirname, "run-example.sh")
const exampleDir = path.join(__dirname, "..", "examples")

function runExample(exampleName) {
    const jsonName =
        Math.random()
            .toString(36)
            .substring(2, 15) + ".json"
    const jsonPath = path.join("/tmp", jsonName)
    const cmd = `EXAMPLE_NAME='${exampleName}' COVERAGE_JSON_PATH='${jsonPath}' ${bashScript}`
    cp.execSync(cmd, {
        timeout: 60000,
        stdio: "ignore",
    })
    const coverage = JSON.parse(fs.readFileSync(jsonPath).toString())
    console.log(coverage)
    return coverage
}

describe("with-jest-puppeteer", () => {
    const example = "parcel-example-with-jest-puppeteer"

    function runWithJestConfig(config) {
        fs.writeFileSync(path.join(exampleDir, example, "jest.config.js"), config)
        const coverage = runExample(example)
        const keys = Object.keys(coverage)
            .map(key => key.split("/"))
            .map(items => items[items.length - 1])
            .sort()
        return [coverage, keys]
    }

    function expectFileCoverage(coverage) {
        for (const key of Object.keys(coverage)) {
            for (const type of ["lines", "branches", "functions", "statements"]) {
                expect(coverage[key][type].pct).toEqual(100)
            }
        }
    }

    test("normal", () => {
        const [coverage, keys] = runWithJestConfig(`
            module.exports = {
                collectCoverage: true,
                collectCoverageFrom: ["src/**/*"],
                coverageReporters: ["text", "lcov", "json", "json-summary"],
                preset: "jest-puppeteer",
                setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
                reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
            }
        `)
        expect(keys).toStrictEqual(["fibonacci.js", "primeDeco.js", "total"])
        expectFileCoverage(coverage)
    })

    // test("collectCoverageFrom (collect from unit test)", () => {
    //     const [coverage, keys] = runWithJestConfig(`
    //         module.exports = {
    //             collectCoverage: true,
    //             collectCoverageFrom: ["**/primeDeco.js"],
    //             coverageReporters: ["text", "lcov", "json", "json-summary"],
    //             setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    //             reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
    //         }
    //     `)
    //     expect(keys).toStrictEqual(["primeDeco.js", "total"])
    //     expectFileCoverage(coverage)
    // })

    // test("collectCoverageFrom (collect from e2e test)", () => {
    //     const [coverage, keys] = runWithJestConfig(`
    //         module.exports = {
    //             collectCoverage: true,
    //             collectCoverageFrom: ["**/fibonacci.js"],
    //             coverageReporters: ["text", "lcov", "json", "json-summary"],
    //             setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    //             reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
    //         }
    //     `)
    //     expect(keys).toStrictEqual(["fibonacci.js", "total"])
    //     expectFileCoverage(coverage)
    // })

    // test("coveragePathIgnorePatterns (ignore unit test)", () => {
    //     const [coverage, keys] = runWithJestConfig(`
    //         module.exports = {
    //             collectCoverage: true,
    //             collectCoverageFrom: ["**/src/*"],
    //             coverageReporters: ["text", "lcov", "json", "json-summary"],
    //             setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    //             reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
    //             coveragePathIgnorePatterns: [
    //                 "/node_modules/",
    //                 "<rootDir>/src/primeDeco.js",
    //             ],
    //         }
    //     `)
    //     expect(keys).toStrictEqual(["fibonacci.js", "total"])
    //     expectFileCoverage(coverage)
    // })

    // test("coveragePathIgnorePatterns (ignore e2e test)", () => {
    //     const [coverage, keys] = runWithJestConfig(`
    //         module.exports = {
    //             collectCoverage: true,
    //             collectCoverageFrom: ["**/src/*"],
    //             coverageReporters: ["text", "lcov", "json", "json-summary"],
    //             setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    //             reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
    //             coveragePathIgnorePatterns: [
    //                 "/node_modules/",
    //                 "<rootDir>/src/fibonacci.js",
    //             ],
    //         }
    //     `)
    //     expect(keys).toStrictEqual(["primeDeco.js", "total"])
    //     expectFileCoverage(coverage)
    // })
})
