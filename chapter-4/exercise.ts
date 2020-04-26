// 1. 関数の型シグネチャのうちどの部分を推論するか。
//    引数も戻り値もしない

// 2. Javascriptのargumentは型安全か？代わりは？
//    型安全ではない。rest parameterを使う。

// 3. すぐに周発する旅行の予約

class Reservation {
    constructor(
        public from: Date,
        public to: Date,
        public destination: string
    ) { }
}

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
    (destination: string): Reservation
}

let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    if (
        fromOrDestination instanceof Date &&
        toOrDestination instanceof Date &&
        destination !== undefined
    ) {
        return new Reservation(fromOrDestination, toOrDestination, destination)
    } else if (
        fromOrDestination instanceof Date &&
        typeof toOrDestination === 'string'
    ) {
        return new Reservation(fromOrDestination, fromOrDestination, toOrDestination)
    } else if (
        typeof fromOrDestination === 'string'
    ) {
        const d = new Date()
        return new Reservation(d, d, fromOrDestination)
    } else {
        const d = new Date()
        return new Reservation(d, d, "error")
    }
}


// 4. callの実装を2番めの引数がstringである関数についてだけ機能するように書き換え

function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}

function fill(length: number, value: string): string[] {
    return Array.from({ length }, () => value)
}

let a = call(fill, 10, 'a')
// let b = call(fill, 10)
// let c = call(fill, 10, 'a', 'z')

function add(a: number, b: number): number {
    return a + b
}

// let d = call(add, 2, 3)


// 型安全なアサーション関数 is を実装

function is<T>(a: T, ...others: [T, ...T[]]): boolean {
    for (let i of others) {
        if (a != i) {
            return false
        }
    }
    return true
}

console.log(1, is('string', 'otherstring')) // false
console.log(2, is(true, false)) // false
console.log(3, is(42, 42)) // true
// console.log(4, is(10, 'foo')) // エラー
console.log(5, is([1], [1, 2], [1, 2, 3])) //false
// console.log(6, is(123)) //エラー
