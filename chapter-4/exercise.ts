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
}

let reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
) => {
    if (toOrDestination instanceof Date && destination != undefined) {
        return new Reservation(from, toOrDestination, destination)
    } else if (typeof toOrDestination === 'string') {
        return new Reservation(from, from, toOrDestination)
    } else {
        // ここには到達しないはずだけど、書かないとコンパイルエラーになる。
        // どう書いておくべきなんだろう？
        return new Reservation(from, from, "Error")
    }
}
