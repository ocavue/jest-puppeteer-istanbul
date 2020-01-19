import { join } from "path"
import { existsSync, unlinkSync, readFileSync, mkdirSync, writeFileSync } from "fs"
import { CoverageMap, CoverageMapData } from "istanbul-lib-coverage"

export class CoverageStorage {
    private coverageDirPath: string
    private coverageJsonPath: string

    constructor(coverageDir = "coverage") {
        this.coverageDirPath = coverageDir
        this.coverageJsonPath = join(this.coverageDirPath, "coverage-puppeteer-istanbul.json")
    }

    read(): CoverageMapData {
        if (existsSync(this.coverageJsonPath)) {
            try {
                return JSON.parse(readFileSync(this.coverageJsonPath, "utf-8"))
            } catch (error) {
                return {}
            }
        }
        return {}
    }

    write(coverage: CoverageMap): void {
        // Node v8 has not `recursive` option. So make sure that `coverageDirPath` doesn't exist before `mkdirSync`.
        if (!existsSync(this.coverageDirPath)) {
            mkdirSync(this.coverageDirPath, { recursive: true })
        }
        writeFileSync(this.coverageJsonPath, JSON.stringify(coverage.data), "utf-8")
    }

    delete(): void {
        if (existsSync(this.coverageJsonPath)) {
            unlinkSync(this.coverageJsonPath)
        }
    }
}
