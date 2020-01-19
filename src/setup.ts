import { Page } from "puppeteer"
import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"

const coverageStorage = new CoverageStorage(process.env.JEST_PUPPETEER_ISTANBUL_DIR)

async function getCoverage(page: Page): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

afterEach(async () => {
    console.log("afterEach before")
    if (process.env.JEST_PUPPETEER_ISTANBUL_COVERAGE === "false") return
    if (typeof page === "undefined") return
    console.log("afterEach after")
    const coverageMap = await getCoverage(page)
    console.log("afterEach coverageMap", coverageMap)
    coverageMap.merge(coverageStorage.read())
    coverageStorage.write(coverageMap)
})
