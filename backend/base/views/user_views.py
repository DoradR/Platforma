import logging
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import MyUser, VideoCourse

from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from base.serializers import UserSerializer, UserSerializerWithToken, VideoCourseSerializer, ProductSerializer
from django.core.mail import send_mail
from django.conf import settings
from ..config import config
import re

from datetime import datetime, timedelta
import jwt


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def validate_password(password):
    if len(password) < 10:
        raise ValidationError('Hasło musi zawierać co najmniej 10 znaków.')

    if not any(char.isdigit() for char in password):
        raise ValidationError('Hasło musi zawierać co najmniej jedną cyfrę.')

    if not any(char.islower() for char in password):
        raise ValidationError(
            'Hasło musi zawierać co najmniej jedną małą literę.')

    if not any(char.isupper() for char in password):
        raise ValidationError(
            'Hasło musi zawierać co najmniej jedną dużą literę.')

    if not re.search("[!@#$%^&*(),.?\":{}|<>]", password):
        raise ValidationError(
            'Hasło musi zawierać co najmniej jeden znak specjalny.')


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

    validate_password(password)

    user = MyUser.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPassword(request):
    data = request.data
    email = data.get('email')

    try:
        user = MyUser.objects.get(email=email)

        token = get_random_string(length=32)

        # Zapisz token w polu reset_password_token w modelu użytkownika
        user.reset_password_token = token
        user.save()

        # Wysyłka emaila z linkiem resetowania hasła
        backend_url = config.get_backend_url()
        reset_url = f"{backend_url}/reset-password-confirm/{user.id}/{token}/"
        message = f"Kliknij w link, aby zresetować hasło: {reset_url}"
        send_mail(
            subject='Reset hasła',
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
        )

        return Response({'detail': 'Link do resetowania hasła został wysłany na podany adres email.'}, status=status.HTTP_200_OK)

    except MyUser.DoesNotExist:
        logger.error("Podany adres email nie istnieje.")
        return Response({'detail': 'Podany adres email nie istnieje.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPasswordConfirm(request):
    data = request.data
    id = data.get('id')
    token = data.get('token')
    newPassword = data.get('newPassword')
    reNewPassword = data.get('reNewPassword')

    try:
        user = MyUser.objects.get(id=id, reset_password_token=token)
    except MyUser.DoesNotExist:
        return Response({'detail': 'Nieprawidłowy token resetowania hasła.'}, status=status.HTTP_400_BAD_REQUEST)

    validate_password(newPassword)

    if newPassword != reNewPassword:
        return Response({'detail': 'Hasła się nie zgadzają.'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(newPassword)
    user.reset_password_token = None
    user.save()

    return Response({'detail': 'Hasło zostało zresetowane.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']

    if 'password' in data and data['password'] != '':
        validate_password(data['password'])
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = MyUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = MyUser.objects.get(id=pk)
    userForDeletion.delete()
    return Response('Użytkownik został usunięty.')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = MyUser.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = MyUser.objects.get(id=pk)

    data = request.data

    user.username = data['username']
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializerWithToken(user, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyCourses(request):
    user = request.user
    courses = user.video_courses.all()

    # Serializacja danych kursów wraz z danymi produktu
    serialized_courses = []
    for course in courses:
        serialized_course = VideoCourseSerializer(course).data
        if course.product:
            serialized_product = ProductSerializer(course.product).data
            serialized_course['product'] = serialized_product
        serialized_courses.append(serialized_course)

    return Response(serialized_courses)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTemporaryCourseToken(request, course_id):
    try:
        course = VideoCourse.objects.get(id=course_id)
        if course not in request.user.video_courses.all():
            return Response({'detail': 'Nie masz dostępu do tego kursu.'}, status=status.HTTP_403_FORBIDDEN)

        payload = {
            'user_id': request.user.id,
            'course_id': course.id,
            'exp': datetime.now() + timedelta(hours=1)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return Response({'token': token}, status=status.HTTP_200_OK)

    except VideoCourse.DoesNotExist:
        return Response({'detail': 'Kurs nie istnieje.'}, status=status.HTTP_404_NOT_FOUND)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accessCourse(request, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        course_id = payload['course_id']

        user = MyUser.objects.get(id=user_id)
        course = VideoCourse.objects.get(id=course_id)

        if user != request.user:
            return Response({'detail': 'Nie masz dostępu do tego kursu.'}, status=status.HTTP_403_FORBIDDEN)

        if course not in user.video_courses.all():
            return Response({'detail': 'Nie masz dostępu do tego kursu.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = VideoCourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except jwt.ExpiredSignatureError:
        return Response({'detail': 'Token wygasł.'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({'detail': 'Nieprawidłowy token.'}, status=status.HTTP_401_UNAUTHORIZED)
    except MyUser.DoesNotExist:
        return Response({'detail': 'Użytkownik nie istnieje.'}, status=status.HTTP_404_NOT_FOUND)
    except VideoCourse.DoesNotExist:
        return Response({'detail': 'Kurs nie istnieje.'}, status=status.HTTP_404_NOT_FOUND)
