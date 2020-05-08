// 1a. 値と型の代わりに名前空間とインターフェースを使って、コンパニオンオブジェクトを実装し直してください。
type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'

interface Currency {
    unit: Unit
    value: number
}

namespace Currency {
    export let DefaultUnit: Currency['unit'] = 'USD'
    export function from(value: number, unit: Unit = Currency.DefaultUnit): Currency {
        return { unit: unit, value }
    }
}

let amountDue1: Currency = { unit: 'JPY', value: 83733.1 }
let amountDue2 = Currency.from(330)
console.log("amountDue1", amountDue1)
console.log("amountDue2", amountDue2)

// 1b. 列挙型に静的メソッドを追加してください
function Unit(s: string): Unit | undefined {
    switch (s) {
        case 'EUR':
        case 'GBP':
        case 'JPY':
        case 'USD':
            return s
        default:
            return undefined
    }
}
