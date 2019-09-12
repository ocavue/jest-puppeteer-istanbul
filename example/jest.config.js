module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*"],
    coverageReporters: ["text", "lcov", "json"],
    preset: "jest-puppeteer",
    setupFilesAfterEnv: ["jest-puppeteer-istanbul/lib/setup"],
    reporters: ["default", "jest-puppeteer-istanbul/lib/reporter"],
}
