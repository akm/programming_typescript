// 2. type O = {a: {b: {c: string}}} というオブジェクト型がある場合、keyof Oの型は何になるでしょうか？ O['a']['b'] についれは、どうでしょうか？

// keyof O // => 'a'
// keyof O['a'] // => 'b'
// keyof O['a']['b'] // => 'c'
