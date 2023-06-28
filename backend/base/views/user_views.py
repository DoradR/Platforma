from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import MyUser

from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from base.serializers import UserSerializer, UserSerializerWithToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    username = data['username']
    email = data['email']
    password = data['password']

    if MyUser.objects.filter(username=username).exists():
        raise ValidationError('Nazwa użytkownika jest już zajęta')
    
    if MyUser.objects.filter(email=email).exists():
        raise ValidationError('Email jest już zajęty')
    
    user = MyUser.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = MyUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)