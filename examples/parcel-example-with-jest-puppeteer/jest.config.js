module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*"],
    coverageReporters: ["text", "lcov", "json", "json-summary"],
    preset: "jest-puppeteer",
    setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
    coverageDirectory: "coverage_result",
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: 80,
    //     },
    // },
}
