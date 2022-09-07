## リポジトリ作成
git init

## ステージ
git add .

## コミットメッセージ
git commit -m "fast commit"

## 直前のコミット前状態に戻す
git reset --soft HEAD^

## githubと連携する
githubにリモートリポジトリを作成
プライベートで作成
コードをコピーしてきて
ターミナルでコマンド叩く
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git branch -M main
git push -u origin main
確認コマンド git remote -v

## ローカルリポジトリでコミットしたものをリモートリポジトリにプッシュする
git push origin main

## リモートリポジトリでコミットしたものをローカルリポジトリでプルする
git pull

## develpブランチに移動する
git checkout develop

## 何か変更(& git commit)後...

## developブランチ（リモート）にpushする
git push origin develop
