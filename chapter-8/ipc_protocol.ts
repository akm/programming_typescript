import { fork } from 'child_process'

type IPCProtocol = {
    [command: string]: {
        in: unknown[]
        out: unknown
    }
}

function createIPCProtocol<P extends IPCProtocol>(script: string) {
    return <K extends keyof P>(command: K) =>
        (...args: P[K]['in']) =>
            new Promise<P[K]['out']>((resolve, reject) => {
                let child = fork(script)
                child.on('error', reject)
                child.on('message', resolve)
                child.send({ command, args })
            })
}

type EchoProtocol = {
    single: {
        in: [string]
        out: string
    }
    multiple: {
        in: [string, number]
        out: string
    }
}

let runWithEchoProtocol = createIPCProtocol<EchoProtocol>('./ipc_echo.js')

runWithEchoProtocol('single')("Foo").
    then(r => console.log("single Foo", r))

runWithEchoProtocol('multiple')("Bar", 3).
    then(r => console.log("multiple Bar, 3", r))
