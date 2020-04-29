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

type ShoeCreator = {
    create(type: 'balletFlat'): BalletFlat
    create(type: 'boot'): Boot
    create(type: 'sneaker'): Sneaker
}

let Shoe: ShoeCreator = {
    create: (type: 'balletFlat' | 'boot' | 'sneaker'): BalletFlat | Boot | Sneaker => {
        switch (type) {
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
        }
    }
}

console.log(Shoe.create('balletFlat'))
console.log(Shoe.create('boot'))
console.log(Shoe.create('sneaker'))


// 4. 型安全なビルダーパターン

class DataHolder {
    protected data: object | null = null

    setData(data: object | null): this {
        this.data = data
        return this
    }
}

class RequestBuilder extends DataHolder {
    setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
        return new RequestBuilderWithMethod(method)
    }

    setURL(url: string): RequestBuilderWithURL {
        return new RequestBuilderWithURL(url).setData(this.data)
    }
}

class RequestBuilderWithURL extends DataHolder {
    constructor(
        private url: string
    ) { super() }

    setMethod(method: 'get' | 'post'): RequestSender {
        return new RequestSender(method, this.url).setData(this.data)
    }
}

class RequestBuilderWithMethod extends DataHolder {
    constructor(
        private method: 'get' | 'post'
    ) { super() }

    setURL(url: string): RequestSender {
        return new RequestSender(this.method, url).setData(this.data)
    }
}


class RequestSender extends DataHolder {
    constructor(
        private method: 'get' | 'post',
        private url: string,
    ) { super() }

    send() {
        console.log(`${this.method} ${this.url}`, this.data)
    }
}


let b = new RequestBuilder
b.setMethod('get').setURL('https://example.com').send() // OK
b.setMethod('post').setURL('https://example.com').send() // OK
b.setMethod('post').setURL('https://example.com').setData({ "foo": 1 }).send() // OK
b.setURL('https://example.com').setMethod('get').send() // OK
b.setURL('https://example.com').setMethod('post').send() // OK
b.setURL('https://example.com').setMethod('post').setData({ "foo": 1 }).send() // OK
b.setData({ "foo": 1 }).setURL('https://example.com').setMethod('post').send() // OK
b.setURL('https://example.com').setData({ "foo": 1 }).setMethod('post').send() // OK
// b.setMethod('post').setData({ "foo": 1 }).send() // NG
// b.setURL('https://example.com').send() // NG


// 4. TypeScriptの機能を使って、それぞれのメソッドの戻り値の型をthisに「追加する」パターンの写経

interface BuildableRequest {
    data?: object
    method: 'get' | 'post'
    url: string
}

class RequestBuilder2 {
    data?: object
    method?: 'get' | 'post'
    url?: string

    setData(data: object): this & Pick<BuildableRequest, 'data'> {
        return Object.assign(this, { data })
    }

    setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
        return Object.assign(this, { method })
    }

    setURL(url: string): this & Pick<BuildableRequest, 'url'> {
        return Object.assign(this, { url })
    }

    send(this: BuildableRequest) {
        console.log(`${this.method} ${this.url}`, this.data)
    }
}

let b2 = new RequestBuilder2                // RequestBuilder2
let b21 = b2.setMethod('post')              // RequestBuilder2 & Pick<BuildableRequest, 'method'>
let b22 = b21.setURL('https://example.com') // RequestBuilder2 & Pick<BuildableRequest, 'method'> & Pick<BuildableRequest, 'url'>
b22.send()

/*
Pick<BuildableRequest, 'method'> は、  BuildableRequestの methodに関する定義だけ抽出するUtility Type
https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk

RequestBuilder2 & Pick<BuildableRequest, 'method'> は、 RequestBuilder2のmethod の定義が
`method?: 'get' | 'post'` から
`method: 'get' | 'post'` に変更された型になっているらしい。
*/


b2.setMethod('get').setURL('https://example.com').send() // OK
b2.setMethod('post').setURL('https://example.com').send() // OK
b2.setMethod('post').setURL('https://example.com').setData({ "foo": 1 }).send() // OK
b2.setURL('https://example.com').setMethod('get').send() // OK
b2.setURL('https://example.com').setMethod('post').send() // OK
b2.setURL('https://example.com').setMethod('post').setData({ "foo": 1 }).send() // OK
b2.setData({ "foo": 1 }).setURL('https://example.com').setMethod('post').send() // OK
b2.setURL('https://example.com').setData({ "foo": 1 }).setMethod('post').send() // OK
// b2.setMethod('post').setData({ "foo": 1 }).send() // NG
// b2.setURL('https://example.com').send() // NG
