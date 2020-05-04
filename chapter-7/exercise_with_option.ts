interface Option<T> {
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Option<U>): Option<U>
    getOrElse(value: T): T
}

class Some<T> implements Option<T> {
    constructor(private value: T) { }
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Some<U>): Some<U>
    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value)
    }
    getOrElse(): T {
        return this.value
    }
}

class None implements Option<never> {
    flatMap<U>(): None
    flatMap<U>(): Option<U> {
        return this
    }
    getOrElse<U>(value: U): U {
        return value
    }
}

// function Option<T>(value: null | undefined): None
// function Option<T>(value: T) Some < T >
function Option<T>(value: T | null): Option<T> {
    if (value == null) {
        return new None
    }
    return new Some(value)
}


class APIWithOption {
    constructor(
        private logedInUserID: UserID
    ) { }

    getLoggedInUserID(): Option<UserID> {
        if (this.logedInUserID == "error") {
            return Option<UserID>(null)
        }
        return Option(this.logedInUserID)
    }

    getFriendIDs(userID: UserID): Option<UserID[]> {
        switch (userID) {
            case "user1":
                return Option(["user2", "user3", "user4"])
            case "user3":
                return Option(["user3", "user5", "user7"])
            default:
                return Option<UserID[]>(null)
        }
    }

    getUserName(userID: UserID): Option<string> {
        switch (userID) {
            case "user1":
            case "user2":
            case "user3":
            case "user4":
                return Option(userID + " name")
            default:
                return Option<string>(null)
        }
    }
}

function listOfOptions2OptionOfList<T>(list: Option<T>[]) {
    let empty = {}
    const vals = list.
        map(opt => opt.getOrElse(empty as T)).
        filter(val => val !== empty)
    return (vals.length > 0) ? new Some(vals) : new None
}


function callApi4(api: APIWithOption) {
    console.log(
        api.getLoggedInUserID().
            flatMap(userID => api.getFriendIDs(userID)).
            flatMap(userIDs =>
                listOfOptions2OptionOfList(userIDs.map(id => api.getUserName(id)))).
            getOrElse("Failed to get friend names")
    )
}

// case 1: 正常
callApi4(new APIWithOption("user1"))
// case 2: getLoggedInUserIDで例外をthrow
callApi4(new APIWithOption("error"))
// case 3: getFriendIDsがnullで例外をthrow
callApi4(new APIWithOption("user2"))
// case 4: getUserNameがnullで例外をthrow
callApi4(new APIWithOption("user3"))
