import { readFile } from 'fs'

type Executor<T> = (
    resolve: (result: T) => void,
    reject: (error: unknown) => void
) => void

class Promise<T> {
    private result?: T
    private error?: unknown

    constructor(f: Executor<T>) {
        f(
            (r: T) => { this.result = r },
            (e: unknown) => { this.error = e },
        )
    }

    then<U>(g: (result: T) => Promise<U> | U): Promise<U> {
        if (this.result) {
            let r = g(this.result)
            if (r instanceof Promise) {
                return r
            }
            return new Promise(
                (resolve: (result: U) => void, _: (error: never) => void) => {
                    resolve(r as U)
                }
            )
        }
        return new Promise(
            (_: (result: never) => void, reject: (error: unknown) => void) => {
                reject(this.error)
            }
        )
    }

    catch<U>(g: (error: unknown) => Promise<U> | U): Promise<U> {
        if (this.error) {
            const r = g(this.error)
            if (r instanceof Promise) {
                return r
            }
            return new Promise(
                (_: (result: never) => void, reject: (error: unknown) => void) => {
                    reject(this.error)
                }
            )
        }

        return new Promise(
            (resolve: (result: U) => void, _: (error: never) => void) => {
                if (this.result) {
                    // resolveに渡す引数の型Uに型Tのthis.resultを渡せない・・・
                    // catchで返すのは、Promise<T>で良い気がするんだけど・・・
                    resolve(this.result)
                }
            }
        )
    }
}

function promisify(f: (arg1: unknown, arg2: unknown, callback: (e: Error | null, data: unknown) => void) => void) {
    return (arg1: unknown, arg2: unknown) => {
        return new Promise((resolve: (result: unknown) => void, reject: (error: unknown) => void) => {
            f(arg1, arg2, (e: Error | null, data: unknown) => {
                if (e) {
                    reject(e)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

// promisify の引数fの引数の型が合わないのでエラーになる・・・どうしたらいいんだろう。
let readFilePromise = promisify(readFile)
readFilePromise('./promisify.ts')
    .then(result => console.log('success reading file', result.toString()))
    .catch(error => console.error('error reading file', error))
