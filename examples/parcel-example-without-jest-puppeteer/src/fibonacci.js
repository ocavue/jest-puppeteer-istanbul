// This function will be covered under a e2e test (jest-puppeteer)
function fibonacci(n) {
    function fib(curr, next, n) {
        if (n == 0) {
            return curr
        } else {
            return fib(next, curr + next, n - 1)
        }
    }
    return fib(0, 1, n)
}

document.getElementById("calculate").onclick = function() {
    const input = document.getElementById("input")
    const result = document.getElementById("result")
    result.innerHTML = fibonacci(Number.parseInt(input.value))
}
