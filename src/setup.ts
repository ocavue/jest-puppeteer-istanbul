import { Page } from "puppeteer"
import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"

const coverageStorage = new CoverageStorage()

async function getCoverage(page: Page): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

afterEach(async () => {
    if (process.env.JEST_PUPPETEER_ISTANBUL_COVERAGE !== "false") {
        const coverageMap = await getCoverage(page)
        coverageMap.merge(coverageStorage.read())
        coverageStorage.write(coverageMap)
    }
})
