// 1a. 値と型の代わりに名前空間とインターフェースを使って、コンパニオンオブジェクトを実装し直してください。
type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'

interface Currency {
    unit: Unit
    value: number
}

namespace Currency {
    export function from(value: number, unit: Unit): Currency {
        return { unit: unit, value }
    }
}


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
