class APIError2 extends Error { }
class NotFound2 extends Error { }

class APIWithReturningException {
    constructor(
        private logedInUserID: UserID | APIError2
    ) { }

    getLoggedInUserID(): UserID | APIError2 {
        return this.logedInUserID
    }

    getFriendIDs(userID: UserID): UserID[] | APIError2 | NotFound2 {
        switch (userID) {
            case "user1":
                return ["user2", "user3", "user4"]
            case "user2":
                return new APIError2('Failed to get friend IDs by ' + userID)
            case "user3":
                return ["user3", "user5", "user7"]
            default:
                return new NotFound2('Failed to get friend IDs by ' + userID)
        }
    }

    getUserName(userID: UserID): string | NotFound2 {
        switch (userID) {
            case "user1":
            case "user2":
            case "user3":
            case "user4":
                return userID + " name"
            default:
                return new NotFound2('Failed to get user name by ' + userID)
        }
    }
}

function callApi3(api: APIWithReturningException) {
    const loggedInUserID = api.getLoggedInUserID()
    if (loggedInUserID instanceof Error) {
        console.log(loggedInUserID.toString())
        return
    }

    const friendIDs = api.getFriendIDs(loggedInUserID)
    if (friendIDs instanceof Error) {
        console.log(friendIDs.toString())
        return
    }

    const friendNames = friendIDs.map(id => api.getUserName(id))
    const errors = friendNames.filter(i => i instanceof Error)
    if (errors.length > 0) {
        console.log(errors.map(i => i.toString()))
        return
    }

    console.log(friendNames)
}

// case 1: 正常
callApi3(new APIWithReturningException("user1"))
// case 2: getLoggedInUserIDがnullを返す
callApi3(new APIWithReturningException(new APIError2("error")))
// case 3: getFriendIDsがnullを返す
callApi3(new APIWithReturningException("user2"))
// case 4: getUserNameがnullを返す
callApi3(new APIWithReturningException("user3"))

// このパターンでは、case 4 でもエラーの詳細が取得できる。
// Go言語のエラーの扱いと似ているけど、Goの方が抽象的なerrorで返すのが慣例と
// なっているので、こういう必要に応じた抽象度の設定は便利かも。
