from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import MyUser

from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from base.serializers import UserSerializer, UserSerializerWithToken
from django.core.mail import send_mail
from django.conf import settings

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

import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def resetPassword(request):
    data = request.data
    email = data.get('email')

    logger.debug(f"Email: {email}")

    try:
        user = MyUser.objects.get(email=email)
        logger.debug(f"User found: {user}")
    except MyUser.DoesNotExist:
        logger.error("Podany adres email nie istnieje.")
        return Response({'detail': 'Podany adres email nie istnieje.'}, status=status.HTTP_400_BAD_REQUEST)

    # Generuj unikalny token do resetowania hasła
    token = get_random_string(length=32)

    # Zapisz token w polu reset_password_token w modelu użytkownika
    user.reset_password_token = token
    user.save()

    # Wysyłka emaila z linkiem resetowania hasła
    reset_url = f"http://localhost:3000/reset-password/confirm/{user.id}/{token}/"
    message = f"Kliknij w link, aby zresetować hasło: {reset_url}"
    send_mail(
        subject='Reset hasła',
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
    )

    return Response({'detail': 'Link do resetowania hasła został wysłany na podany adres email.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPasswordConfirm(request):
    data = request.data
    _id = data.get('_id')
    token = data.get('token')
    new_password = data.get('new_password')
    re_new_password = data.get('re_new_password')

    try:
        user = MyUser.objects.get(id=_id, reset_password_token=token)
    except MyUser.DoesNotExist:
        return Response({'detail': 'Nieprawidłowy token resetowania hasła.'}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != re_new_password:
        return Response({'detail': 'Hasła się nie zgadzają.'}, status=status.HTTP_400_BAD_REQUEST)

    # Ustawienie nowego hasła
    user.set_password(new_password)
    user.reset_password_token = None
    user.save()

    return Response({'detail': 'Hasło zostało zresetowane.'}, status=status.HTTP_200_OK)


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