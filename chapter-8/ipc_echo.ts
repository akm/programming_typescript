console.log("ipc_echo started")

type IPCCommand =
    | { command: 'single', args: [string] }
    | { command: 'multiple', args: [string, number] }


process.on('message', data => {
    console.log('ipc_echo data', data)
    const r = processIPCCommand(data)
    console.log('ipc_echo result', r)
    process.send!(r)
})

function processIPCCommand(cmd: IPCCommand) {
    switch (cmd.command) {
        case 'single':
            return single(cmd.args[0])
        case 'multiple':
            return multiple(cmd.args[0], cmd.args[1])
    }
}

function single(s: string): string {
    return s
}

function multiple(s: string, n: number): string {
    let r: string[] = new Array(n)
    for (let i = 0; i < n; i++) {
        r[i] = s
    }
    return r.join(" ")
}
