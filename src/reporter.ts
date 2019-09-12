import { join } from 'path'
import { existsSync, unlinkSync, readFileSync } from 'fs'
import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { BaseReporter, CoverageReporter } from "@jest/reporters"
import { TestResult, AggregatedResult } from '@jest/test-result'
import { Test } from 'jest-runner'
import { Config } from '@jest/types';

const COVERAGE_DIR_PATH = join(process.cwd(), 'coverage')
const COVERAGE_JSON_PATH = join(COVERAGE_DIR_PATH, 'coverage-puppeteer-istanbul.json')

export = class PuppeteerIstanbul extends CoverageReporter {
    constructor(globalConfig: any, _options: any) {
        const coverageReporters = globalConfig.coverageReporters || []
        if (coverageReporters.indexOf('text') === -1 && coverageReporters.indexOf('text-summary') === -1) {
            coverageReporters.push('text-summary')
        }
        super({ ...globalConfig, coverageReporters: coverageReporters }, _options);
    }

    onRunStart(_results: any, _options: any) {
        if (existsSync(COVERAGE_JSON_PATH)) {
            unlinkSync(COVERAGE_JSON_PATH)
        }
        return super.onRunStart(_results, _options)
    }

    onTestResult(
        _test: Test,
        testResult: TestResult,
        _aggregatedResults: AggregatedResult,
    ) {
        let coverage = createCoverageMap({})

        if (existsSync(COVERAGE_JSON_PATH)) {
            let puppeteerCoverageData = JSON.parse(readFileSync(COVERAGE_JSON_PATH, 'utf-8'))
            coverage.merge(puppeteerCoverageData)
        }
        if (testResult.coverage) {
            coverage.merge(testResult.coverage)
        }
        if (Object.keys(coverage).length) {
            testResult.coverage = coverage.data;
        }

        return super.onTestResult(_test, testResult, _aggregatedResults)
    }

    onRunComplete(_contexts: any, _aggregatedResults: AggregatedResult) {
        return super.onRunComplete(_contexts, _aggregatedResults)
    }
}

