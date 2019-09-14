import { createCoverageMap } from "istanbul-lib-coverage"
import { CoverageReporter } from "@jest/reporters"
import { TestResult, AggregatedResult } from "@jest/test-result"
import { Test } from "jest-runner"
import { Config } from "@jest/types"
import { CoverageStorage } from "./storage"

export = class PuppeteerIstanbul extends CoverageReporter {
    private collectCoverage: boolean
    private coverageStorage: CoverageStorage

    constructor(globalConfig: Config.GlobalConfig, _options: any) {
        const coverageReporters = [...(globalConfig.coverageReporters || [])]

        // Remove "text" or "text-summary" from the origin config. Because the text result output by
        // the origin CoverageReporter doesn't include puppeteer information.
        let reporterIndex: number
        if ((reporterIndex = globalConfig.coverageReporters.indexOf("text")) >= 0)
            globalConfig.coverageReporters.splice(reporterIndex, 1)
        if ((reporterIndex = globalConfig.coverageReporters.indexOf("text-summary")) >= 0)
            globalConfig.coverageReporters.splice(reporterIndex, 1)

        super({ ...globalConfig, coverageReporters: coverageReporters }, _options)

        this.collectCoverage = globalConfig.collectCoverage
        // Using environment variable to communicate between reporter and setup
        process.env.JEST_PUPPETEER_ISTANBUL_COVERAGE = String(this.collectCoverage)
        process.env.JEST_PUPPETEER_ISTANBUL_DIR = globalConfig.coverageDirectory
        this.coverageStorage = new CoverageStorage(globalConfig.coverageDirectory)
    }

    onRunStart(_results: any, _options: any) {
        if (this.collectCoverage) {
            this.coverageStorage.delete()
            return super.onRunStart(_results, _options)
        }
    }

    onTestResult(_test: Test, testResult: TestResult, _aggregatedResults: AggregatedResult) {
        if (this.collectCoverage) {
            const coverage = createCoverageMap({})

            coverage.merge(this.coverageStorage.read())
            if (testResult.coverage) {
                coverage.merge(testResult.coverage)
            }
            if (Object.keys(coverage).length) {
                testResult.coverage = coverage.data
            }
            return super.onTestResult(_test, testResult, _aggregatedResults)
        }
    }

    onRunComplete(contexts: any, aggregatedResults: any) {
        if (this.collectCoverage) {
            return super.onRunComplete(contexts, aggregatedResults)
        } else {
            return Promise.resolve()
        }
    }
}
