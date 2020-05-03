// 3. TかUのどちらかに含まれる(ただし両方には含まれない)型を計算するExclusive<T, U>型を記述してください。
//    たとえば、 Exclusive<1 | 2 | 3, 2 | 3 | 4> は、1 | 4 になります。
//    Exclusive<1 | 2, 2 | 4>を型チェッカーがどのように評価するかを、ステップごとに書き出してください。

type Exclusive<T, U> = (T extends U ? never : T) | (U extends T ? never : U)

type A1 = Exclusive<1 | 2, 2 | 4>

// A1、A3は間違っていないが、A2 が (1 | 2 | 4) になってしまうのはなぜ？
// A1からいきなりA3に展開できる気がしないんだけど、本来ここはどう書くべき？
type A2 =
    ((1 | 2) extends (2 | 4) ? never : (1 | 2)) |
    ((2 | 4) extends (1 | 2) ? never : (2 | 4))

type A3 =
    (1 extends (2 | 4) ? never : 1) | (2 extends (2 | 4) ? never : 2) |
    (2 extends (1 | 2) ? never : 2) | (4 extends (1 | 2) ? never : 4)

type A4 =
    (1 extends (2 | 4) ? never : 1) |
    (2 extends (2 | 4) ? never : 2) |
    (2 extends (1 | 2) ? never : 2) |
    (4 extends (1 | 2) ? never : 4)

type A5 =
    ((1 extends 2 ? never : 1) & (1 extends 4 ? never : 1)) |
    ((2 extends 2 ? never : 2) & (2 extends 4 ? never : 2)) |
    ((2 extends 1 ? never : 2) & (2 extends 2 ? never : 2)) |
    ((4 extends 1 ? never : 4) & (4 extends 2 ? never : 4))

type A6 =
    ((1) & (1)) |
    ((never) & (2)) |
    ((2) & (never)) |
    ((4) & (4))

type A7 =
    1 |
    never |
    never |
    4

type A8 = 1 | 4
