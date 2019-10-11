const primeDeco = require("../src/primeDeco")

describe("Prime decomposition", () => {
    test("1", () => {
        expect(primeDeco(1)).toStrictEqual([1])
    })
    test("4", () => {
        expect(primeDeco(4)).toStrictEqual([2, 2])
    })
    test("527", () => {
        expect(primeDeco(527)).toStrictEqual([17, 31])
    })
})
