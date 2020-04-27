// 1. クラスとインターフェースの違いは何でしょう？

// クラスはインスタンスを作れるがインターフェースは作れない。
// インターフェースはJavaScriptのコードを発行しない。クラスはする。

// 2. クラスのコンストラクターをprivateではなくprotectedと指定すると何が起こるでしょうか？

class MessageQueue {
    protected constructor(private messages: string[]) { }
}

// privateの状態で new MessageQueue([]) とすると、以下のエラー
// Constructor of class 'MessageQueue' is private and only accessible within the class declaration. [2673]
//
// class Foo extends MessageQueue { } という継承するクラスを定義すると以下のエラー
// Cannot extend a class 'MessageQueue'. Class constructor is marked as private. [2675]

// protectedに変更し new MessageQueue([]) とすると、以下のエラー
// Constructor of class 'MessageQueue' is private and only accessible within the class declaration. [2673]
//
// しかし、class Foo extends MessageQueue { } という継承するクラスを定義してもエラーにならない。


// 3. 5.11.1 ファクトリーパターンで作成した実装を拡張して、抽象化を多少犠牲にしてでも、より安全にしてください。

type Shoe = {
    purpose: string
}

class BalletFlat implements Shoe {
    purpose = 'dancing'
}

class Boot implements Shoe {
    purpose = 'woodcutting'
}

class Sneaker implements Shoe {
    purpose = 'walking'
}

type CreateShoe = {
    (type: 'balletFlat'): BalletFlat
    (type: 'boot'): Boot
    (type: 'sneaker'): Sneaker
}

let m: CreateShoe = (type: 'balletFlat' | 'boot' | 'sneaker'): BalletFlat | Boot | Sneaker => {
    switch (type) {
        case 'balletFlat': return new BalletFlat
        case 'boot': return new Boot
        case 'sneaker': return new Sneaker
    }
}

let Shoe = {
    create: m
}

const s = Shoe.create('boot')
console.log(s)
