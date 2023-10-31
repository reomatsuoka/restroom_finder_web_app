# restroom_finder_web_app

## やること
1.PostgreSQLをインストールして起動する
- `brew install postgresql`
- `brew services start postgresql`

2. restroom_finder_web_app/my-app/myproject/myproject/settings.pyで接続設定を行う。
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'reo37458', → 自分のスーパーユーザー名に変更(基本的にPCのユーザー名と同じ)
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
3. restroom_finder_web_app/my-app/.env　を作成<br>
  REACT_APP_GOOGLE_MAPS_API_KEY={GoogleマップのAPIキーを入れる}

4. restroom_finder_web_app/my-app/.gtignore に.envを追加する

5. backendとfrontendのターミナルをそれぞれ開いて下記の手順に進む

  **backend**<br>
  my-app/myprojectで
  - `pip install -r requirements.txt`
  - `python manage.py makemigrations `
  - `python manage.py migrate `
  - `python manage.py create_random_markers 20` #GoogleMapに刺すピンをダミーで20個作成
  - `python manage.py runserver`
  (ターミナルに出力されるURLに入り、/api/markerを付け加えたURLでデータがあるかを確認する)

**frontend**<br>
my-appで
- `npm install`
- `npm start`
