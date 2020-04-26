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
    if (fromOrDestination instanceof Date) {
        let from = fromOrDestination
        if (toOrDestination instanceof Date && destination != undefined) {
            return new Reservation(from, toOrDestination, destination)
        } else if (typeof toOrDestination === 'string') {
            return new Reservation(from, from, toOrDestination)
        }
        return new Reservation(from, from, "error")
    }
    let d = new Date()
    if (typeof fromOrDestination === 'string') {
        return new Reservation(d, d, fromOrDestination)
    }
    return new Reservation(d, d, "error")
}
