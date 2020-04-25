# Emacsの環境構築のログ

## TypeScriptはじめました
TypeScriptの勉強にプログラミングTypeScriptを読み始める。2章でエディタの設定をするということなのでEmacsに何を入れればいいのか調べる

typescript-modeでぐぐって https://github.com/emacs-typescript/typescript.el に https://github.com/ananthakumaran/tide/ と https://github.com/josteink/ts-comint を見つける

ややこしそうなので、説明してくれる記事を探す
https://blog.shibayu36.org/entry/2015/07/30/165626 に auto-complete とは違う company-mode というものがあることを知る。


インストールしようとしているtideは company-mode 一択 https://github.com/ananthakumaran/tide


自分の環境はどちらか。go-autocompleteを入れたときにauto-complete を入れてた（company-mode でも使えるらしいけど)。

https://qiita.com/syohex/items/8d21d7422f14e9b53b17 にauto-completeのco-maintainerの方によるcompany-modeの説明を見つける。ありがたい。

あ、でもこれちゃんとインストールできてからツイートする方がいいな。

メモっておこう・・・うーん、stickies微妙だな。最近のメモアプリは？Bearを入れてみる。お、ええやん。

いやでも待てよ。やっぱこういうときもEmacsじゃね？
org-mode?うーんmarkdownがいいんだけどなー

長年ライトなemacsユーザーなので、今更急に頑張ってもしゃあない。今日はBearで。


まずは今のgocodeをcompany-modeで動くように変更する。
https://github.com/nsf/gocode/tree/master/emacs-company の通りに設定してみたけど、補完が動かない。

うーん、だめだ。動かん。なので、gocodeはこれまで通りauto-completeで動かして、typescriptのtideの方はcompany-modeで動かそう（本当にできるのか）

typescript-modeは前に入門したときに入れてた(忘れてた)

tideをインストールする。
インストールはできているっぽいが、tsファイルを開くとtslintがないと。
たぶん、プロジェクトに `npm install --save-dev tslint` してるからだよな。

[Installation — Flycheck 32-cvs documentation](http://www.flycheck.org/en/latest/user/installation.html)
http://www.flycheck.org/en/latest/user/installation.html には
> For a GUI Emacs on MacOS we recommend to install and configure  [exec-path-from-shell](https://github.com/purcell/exec-path-from-shell)  to make Emacs use the proper $PATH and avoid a  [common setup issue on MacOS](http://www.flycheck.org/en/latest/user/troubleshooting.html#flycheck-macos-exec-path-from-shell) .

とある。

うーん、違うなこれ。

こっちだ。
[GitHub - codesuki/add-node-modules-path: Adds the node_modules/.bin directory to the buffer exec_path. E.g. support project local eslint installations.](https://github.com/codesuki/add-node-modules-path)

```
(eval-after-load 'js-mode
  '(add-hook 'js-mode-hook #'add-node-modules-path))
```

とあるけど、これを typescript-modeように変更

```
(eval-after-load 'typescript-mode
  '(add-hook 'typescript-mode-hook #'add-node-modules-path))
```

できたー！

なにこれ便利じゃーん。
