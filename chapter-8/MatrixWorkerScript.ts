function newMatrix(x: number, y: number): Matrix {
    let m: Array<number[]> = new Array(y)
    for (let i = 0; i < y; i++) {
        m[i] = new Array(x)
    }
    return m
}

type Command =
    | { command: 'determinant', args: [Matrix] }
    | { command: 'dot-product', args: [Matrix, Matrix] }
    // | { command: 'invert', args: [Matrix] }
    | { command: 'transpose', args: [Matrix] }

onmessage = e => {
    let r = processCommand(e.data)

    postMessage(r)
}

function processCommand(c: Command) {
    switch (c.command) {
        case 'determinant':
            return determinant(c.args[0])
        case 'dot-product':
            return dotProduct(c.args[0], c.args[1])
        // 逆行列の計算(特に余因子の計算)が面倒くさいのでinvertではなく転置行列transposeにする
        // case 'invert':
        case 'transpose':
            return transpose(c.args[0])
    }
}

function determinant(m: Matrix): number {
    const l = m.length
    let r = 0
    for (let i = 0; i < l; i++) {
        let v = 1
        for (let j = 0; j < l; j++) {
            v = v * m[(i + j) % l][j]
        }
        r += v
    }
    for (let i = 0; i < l; i++) {
        let v = 1
        for (let j = 0; j < l; j++) {
            v = v * m[(j - i) % l][j]
        }
        r -= v
    }
    return r
}

function dotProduct(a: Matrix, b: Matrix): Matrix {
    const lx = a[0].length
    const ly = a.length
    let r = newMatrix(lx, ly)
    for (let x = 0; x < lx; x++) {
        for (let y = 0; y < ly; y++) {
            r[y][x] = a[y][x] + b[x][y]
        }
    }
    return r
}

function transpose(m: Matrix): Matrix {
    const lx = m[0].length
    const ly = m.length
    let r = newMatrix(lx, ly)
    for (let x = 0; x < lx; x++) {
        for (let y = 0; y < ly; y++) {
            r[y][x] = m[x][y]
        }
    }
    return r
}
