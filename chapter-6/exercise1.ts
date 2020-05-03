// つぎのそれぞれの型のペアについて、最初の型が2番目の型に割り当て可能かどうかを、その理由も添えて堪えてください。
// サブタイプと変性の観点からこれらについても考え、もし革新を持ってこたえられなければ・・・

// a. 1, number : 1はnumberに含まれるので可能
// b. number, 1 : number は 1 以外も含むので不可
// c. string, number | string  : stringはnumber | stringに含まれるので可能
// d. boolean, number : booleanはnumberに含まれないので不可
// e. number[], (number | string)[] : number[] は (number | string)[] に含まれるので可能
// f. (number | string)[], number[] : (number | string)[] には number[] 以外も含むので不可
// g. {a: true}, {a: boolan} : {a: true} は {a: boolan} に含まれるので可能
// h. {a: {b: [string]}}, {a: {b: [number | string]}} : 前者は後者に含まれるので可能
// i. {a: number) => string, (b: number) => string : 引数名は型には含まれないので可能
// j. (a: number) => string, (a: string) => string : 引数の型が異なるので不可
// k. (a: number | string) => string, (a: string) => string : 前者の引数は後者の引数を含む( >: ) なので可能
// l. (列挙型 enum E {X = 'X' } で定義されている) E.X と (列挙型 enum F {X = 'X' } で定義されている) F.X : 列挙型は名前的型

enum E { X = 'X' }

enum F { X = 'X' }

// let val: F = E.X
// ==> Type 'E' is not assignable to type 'F'. [2322]
