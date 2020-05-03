// 2. type O = {a: {b: {c: string}}} というオブジェクト型がある場合、keyof Oの型は何になるでしょうか？ O['a']['b'] についれは、どうでしょうか？

type O = { a: { b: { c: string } } }

type keyofO = keyof O // => 'a'
type keyofOa = keyof O['a'] // => 'b'
type keyofOab = keyof O['a']['b'] // => 'c'

type Oab = O['a']['b'] // => {c: string}
