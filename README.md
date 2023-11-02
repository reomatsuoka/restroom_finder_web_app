# restroom_finder_web_app

このアプリはconda環境に入って実行することを前提として作成しています。
### conda環境作成 & 環境に入る
- `conda create -n restroom_app_web python=3.11`
- `conda activate restroom_app_web`

## 手順書
1.PostgreSQLをインストールして起動する
- `brew install postgresql`
- `brew services start postgresql`

2. restroom_finder_web_app/restroom_app/backend/src/settings.pyで接続設定を行う。
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'reo37458', → 自分のスーパーユーザー名に変更(基本的にPCのユーザー名と同じ)
        'PASSWORD': 'mypassword', → パスワードを自身のものに変更
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
3. restroom_finder_web_app/restroom_app/.env　を作成<br>
  REACT_APP_GOOGLE_MAPS_API_KEY={GoogleマップのAPIキーを入れる}

4. backendとfrontendのターミナルをそれぞれ開いて下記の手順に進む
**backend**<br>
restroom-app/backendで
- `pip install -r requirements.txt`
- `python manage.py makemigrations `
- `python manage.py migrate `
- `python manage.py populate_db 20` #GoogleMapに刺すピンをダミーで20個作成
- `python manage.py runserver`
(ターミナルに出力されるURLに入り、`http://127.0.0.1:8000/api/locations/`　にJSONデータがあるかを確認する)

**frontend**<br>
restroom-appで
- `npm install`
- `npm start`
