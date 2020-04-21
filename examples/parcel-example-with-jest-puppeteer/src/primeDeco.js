// This function will be covered under a unit test (normal jest test)
module.exports = function primeDeco(n) {
    const result = []
    for (let i = 2; i <= n; i++) {
        while (n !== i) {
            if (n % i !== 0) {
                break
            }
            result.push(i)
            n = n / i
        }
    }
    result.push(n)
    return result
}
