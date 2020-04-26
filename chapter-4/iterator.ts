let numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n < 10; n++) {
            yield n
        }
    }
}

for (let a of numbers) {
    console.log(a)
}

const allNumbers = [...numbers]
console.log(allNumbers)

let [one, two, ...rest] = numbers
console.log(one)
console.log(two)
console.log(rest)

// *[Symbol.iterator]() {...} という記述はどういうこと？
// `*` がGeneratorの印で `[Symbol.iteraotr]` が関数名？
// 他の書き方はあるんだろうか？
