// 4. 明確な割当アサーションを使わないように、(「6.6.3 明確な割り当てアサーション」の）例を書き直してください

let userId!: string
fetchUser()

userId.toUpperCase()

function fetchUser() {
    userId = globalCache.get('userId')
}

let globalCache = {
    get(name: string) {
        return name
    }
}
