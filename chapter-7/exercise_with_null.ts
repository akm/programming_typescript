class APIWithNull {
    constructor(
        private logedInUserID: UserID | null
    ) { }

    getLoggedInUserID(): UserID | null {
        return this.logedInUserID
    }

    getFriendIDs(userID: UserID): UserID[] | null {
        switch (userID) {
            case "user1":
                return ["user2", "user3", "user4"]
            case "user2":
                return null
            case "user3":
                return ["user3", "user5", "user7"]
            default:
                return null
        }
    }

    getUserName(userID: UserID): string | null {
        switch (userID) {
            case "user1":
            case "user2":
            case "user3":
            case "user4":
                return userID + " name"
            default:
                return null
        }
    }
}

function callApi1(api: APIWithNull) {
    const loggedInUserID = api.getLoggedInUserID()
    if (loggedInUserID == null) {
        console.log("Failed to get logged in user ID")
        return
    }

    const friendIDs = api.getFriendIDs(loggedInUserID)
    if (friendIDs == null) {
        console.log("Failed to get friend IDs by ${friendIDs}")
        return
    }

    const friendNames = friendIDs.map(id => api.getUserName(id))
    if (friendNames.includes(null)) {
        console.log("Failed to get user name")
        return
    }

    console.log(friendNames)
}

// case 1: 正常
callApi1(new APIWithNull("user1"))
// case 2: getLoggedInUserIDがnullを返す
callApi1(new APIWithNull(null))
// case 3: getFriendIDsがnullを返す
callApi1(new APIWithNull("user2"))
// case 4: getUserNameがnullを返す
callApi1(new APIWithNull("user3"))

// このパターンでは、case 4 のエラーの詳細を出力することが難しい
