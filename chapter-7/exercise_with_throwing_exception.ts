class APIError extends Error { }
class NotFound extends Error { }

class APIWithThrowing {
    constructor(
        private logedInUserID: UserID
    ) { }

    getLoggedInUserID(): UserID {
        if (this.logedInUserID == "error") {
            throw new APIError("Failed to get logged in user")
        }
        return this.logedInUserID
    }

    getFriendIDs(userID: UserID): UserID[] {
        switch (userID) {
            case "user1":
                return ["user2", "user3", "user4"]
            case "user3":
                return ["user3", "user5", "user7"]
            default:
                throw new APIError('Failed to get friend IDs by ' + userID)
        }
    }

    getUserName(userID: UserID): string {
        switch (userID) {
            case "user1":
            case "user2":
            case "user3":
            case "user4":
                return userID + " name"
            default:
                throw new NotFound('Failed to get user name by ' + userID)
        }
    }
}

function callApi2(api: APIWithThrowing) {
    try {
        const loggedInUserID = api.getLoggedInUserID()
        const friendIDs = api.getFriendIDs(loggedInUserID)
        const friendNames = friendIDs.map(id => api.getUserName(id))
        console.log(friendNames)
    } catch (e) {
        // console.log(e) // これだとスタックトレースが出力される
        console.log(e.toString())
    }
}

// case 1: 正常
callApi2(new APIWithThrowing("user1"))
// case 2: getLoggedInUserIDで例外をthrow
callApi2(new APIWithThrowing("error"))
// case 3: getFriendIDsがnullで例外をthrow
callApi2(new APIWithThrowing("user2"))
// case 4: getUserNameがnullで例外をthrow
callApi2(new APIWithThrowing("user3"))

// このパターンでは、ロジックがnullのパターンに比べてわかりやすいし、原因はっきりさせやすい
