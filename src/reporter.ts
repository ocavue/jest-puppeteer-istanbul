import { createCoverageMap, FileCoverage } from "istanbul-lib-coverage"
import { shouldInstrument, ShouldInstrumentOptions } from "@jest/transform"
import { CoverageReporter } from "@jest/reporters"
import { TestResult } from "@jest/test-result"
import { Test } from "jest-runner"
import { Config } from "@jest/types"
import { CoverageStorage } from "./storage"

export = class PuppeteerIstanbul extends CoverageReporter {
    private collectCoverage: boolean
    private coverageStorage: CoverageStorage
    private shouldInstrumentOptions: ShouldInstrumentOptions

    constructor(globalConfig: Config.GlobalConfig, _options?: any) {
        const coverageReporters = [...(globalConfig.coverageReporters || [])]

        // Remove "text" or "text-summary" from the origin config. Because the text result output by
        // the origin CoverageReporter doesn't include puppeteer information.
        let reporterIndex: number
        if ((reporterIndex = globalConfig.coverageReporters.indexOf("text")) >= 0)
            globalConfig.coverageReporters.splice(reporterIndex, 1)
        if ((reporterIndex = globalConfig.coverageReporters.indexOf("text-summary")) >= 0)
            globalConfig.coverageReporters.splice(reporterIndex, 1)

        super({ ...globalConfig, coverageReporters: coverageReporters }, _options)

        this.shouldInstrumentOptions = {
            collectCoverage: globalConfig.collectCoverage,
            collectCoverageFrom: globalConfig.collectCoverageFrom,
            collectCoverageOnlyFrom: globalConfig.collectCoverageOnlyFrom,
            coverageProvider: globalConfig.coverageProvider,
            changedFiles: undefined,
        }

        this.collectCoverage = globalConfig.collectCoverage
        // Using environment variable to communicate between reporter and setup
        process.env.JEST_PUPPETEER_ISTANBUL_DIR = globalConfig.coverageDirectory
        process.env.JEST_PUPPETEER_ISTANBUL_COVERAGE = this.collectCoverage ? "true" : "false"
        this.coverageStorage = new CoverageStorage(globalConfig.coverageDirectory)
    }

    onRunStart(_results: any, _options: any) {
        if (this.collectCoverage) {
            this.coverageStorage.delete()
            return super.onRunStart(_results, _options)
        }
    }

    onTestResult(test: Test, testResult: TestResult) {
        if (this.collectCoverage) {
            const coverage = createCoverageMap({})
            const mergeFileCoverage = ([filename, fileCoverage]: [string, FileCoverage]) => {
                if (shouldInstrument(filename, this.shouldInstrumentOptions, test.context.config)) {
                    coverage.merge({ [filename]: fileCoverage })
                }
            }

            Object.entries(this.coverageStorage.read()).map(mergeFileCoverage)
            if (testResult.coverage) {
                Object.entries(testResult.coverage).map(mergeFileCoverage)
            }
            if (Object.keys(coverage).length) {
                testResult.coverage = coverage.data
            }
            return super.onTestResult(test, testResult)
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
