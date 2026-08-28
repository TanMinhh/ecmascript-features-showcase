const prices = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

//Old way using add operator / reduce
const oldTotal = prices.reduce((sum, val) => sum + val);
console.log(oldTotal); //0.99999999.... => accumulated error

//Using Math.sumPrecise
//Because Math.sumPrecise is a recent ECMAScript proposal and is not yet natively supported or enabled by default in Node.js v24.7.0. So i define my own precise summation function (using the Kahan summation algorithm to prevent floating-point precision loss) before calling it.
Math.sumPrecise = Math.sumPrecise || function (iterable) {
    let sum = 0;
    let c = 0;
    for (const num of iterable) {
        const y = num - c;
        const t = sum + y;
        c = (t - sum) - y;
        sum = t;
    }
    return sum;
};
const newTotal = Math.sumPrecise(prices);
console.log(newTotal); //1 => Absolute