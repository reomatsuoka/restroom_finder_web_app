from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']

        # 既に存在するユーザーをチェック
        if User.objects.filter(username=email).exists():
            return JsonResponse({"error": "User with this email already exists"}, status=400)

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return JsonResponse({"message": "User created successfully"}, status=201)
    return JsonResponse({"error": "Invalid request"}, status=400)



@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(username=data['email'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=400)