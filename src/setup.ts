import { join } from "path"
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs"
import { Page } from "puppeteer"
import { CoverageMap, CoverageMapData, createCoverageMap } from "istanbul-lib-coverage"

const COVERAGE_DIR_PATH = join(process.cwd(), "coverage")
const COVERAGE_JSON_PATH = join(COVERAGE_DIR_PATH, "coverage-puppeteer-istanbul.json")

async function getCoverage(page: Page): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

function getExistsCoverageData(): CoverageMapData {
    if (existsSync(COVERAGE_JSON_PATH)) {
        try {
            return JSON.parse(readFileSync(COVERAGE_JSON_PATH, "utf-8"))
        } catch (error) {
            return {}
        }
    }
    return {}
}

function saveCoverage(coverage: CoverageMap) {
    mkdirSync(COVERAGE_DIR_PATH, { recursive: true })
    writeFileSync(COVERAGE_JSON_PATH, JSON.stringify(coverage.data))
}

afterEach(async () => {
    if (process.env.JEST_PUPPETEER_ISTANBUL_COVERAGE !== "false") {
        const coverageMap = await getCoverage(page)
        coverageMap.merge(getExistsCoverageData())
        saveCoverage(coverageMap)
    }
})
