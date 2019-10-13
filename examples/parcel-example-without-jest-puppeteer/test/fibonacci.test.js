const puppeteer = require("puppeteer")

async function setupPuppeteer() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    global.page = page
}

describe("fibonacci number", () => {
    beforeAll(async () => {
        await setupPuppeteer()
        await page.goto("http://localhost:1234")
        await page.waitFor(200)
    })

    const typeAndCalculate = async function(inputNumber) {
        await page.click("#input")

        await page.$eval("#input", el => el.setSelectionRange(0, el.value.length))
        await page.keyboard.press("Backspace")

        await page.keyboard.type(inputNumber)
        await page.click("#calculate")
        await page.waitFor(500) // Wait for the calculation
        const result = await page.$eval("#result", element => element.innerHTML)
        return result
    }

    test("The 0st fibonacci number", async () => expect(await typeAndCalculate("0")).toBe("0"))
    test("The 1st fibonacci number", async () => expect(await typeAndCalculate("1")).toBe("1"))
    test("The 2nd fibonacci number", async () => expect(await typeAndCalculate("2")).toBe("1"))
    test("The 9st fibonacci number", async () => expect(await typeAndCalculate("9")).toBe("34"))
})
