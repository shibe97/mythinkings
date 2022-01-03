# mythinkings.
SvelteKit製のブログ  
https://www.mythinkings.net

## microCMSのAPIスキーマ設定
### ブログ
endpoint: blog  
type: リスト形式

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| title         | タイトル    | テキストフィールド          |
| tags          | タグ       | 複数コンテンツ参照 - タグ   |
| ogimage       | OGP画像    | 画像                     |
| body          | 本文       | 繰り返しフィールド         |
| description   | 概要       | テキストフィールド        |
| books         | 参考書籍    | 繰り返しフィールド        |
| author        | 著者       | コンテンツ参照 - 著者     |

#### カスタムフィールド
フィールドID: richText

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| richText      | リッチテキスト   | リッチエディタ   |


フィールドID: textWithRightImage

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| text        | テキスト | リッチエディタ            |
| image       | 画像    | 画像                     |
| caption     | キャプション  | テキストフィールド   |


フィールドID: book

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| image         | 画像    | 画像                     |
| title         | タイトル    | テキストフィールド     |
| author        | 著者       | テキストフィールド     |
| url           | URL  | テキストフィールド   |


フィールドID: linkCard

| フィールド ID | 表示名     | 種類                        |
| ------------- | ---------- | --------------------------- |
| url           | URL  | テキストフィールド   |


### 著者
endpoint: authors  
type: リスト形式

| フィールドID | 表示名 | 種類 |
| ------------- | ------------- | ----- |
| name    | 氏名 | テキストフィールド |
| profile | プロフィール文 | テキストエリア |
| image   | 画像 | 画像 |
| twitter | Twitter ID | テキストフィールド |
| github  | GitHub ID | テキストフィールド |


### タグ
endpoint: tags  
type: リスト形式

| フィールド ID | 表示名 | 種類               |
| ------------- | ------ | ------------------ |
| name          | タグ名   | テキストフィールド |


## 環境変数
プロジェクトルートに`.env`ファイルを作成し、以下の項目を設定してください。
- API_KEY（microCMSのAPIキー）
- SERVICE_ID（microCMSのサービスID）

例:
```
API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
SERVICE_ID=your-service-id
```

## 開発方法

```bash
# パッケージをインストール
$ npm install

# 開発サーバーを起動（localhost:3000）
$ npm run dev

# アプリケーションをビルド
$ npm run build
```

## ライセンス
Apache License 2.0