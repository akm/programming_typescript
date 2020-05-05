## 7.6 練習問題

```typescript
class API {
    getLoggedInUserID(): UserID
    getFriendIDs(userID: UserID): UserID[]
    getUserName(userID: UserID): string
}
```

これらについて一連のアクションをどのように実行できるかについて考えてください
(たとえば、ログインしたユーザーのIDを取得し、彼らの友人リストを取得し、それぞれの友人の名前を取得する)。


### 方針

7章で紹介された以下の４つのパターンそれぞれを実装してみる。

- エラー発生時にはnullを返す
- 例外をthrowする
- 例外をreturnする
- Optionを使う
