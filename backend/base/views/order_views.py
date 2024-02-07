from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Product, Order, OrderItem, DeliveryAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'Brak Zamówionych Przedmiotów'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            deliveryPrice=0,
            totalPrice=data['totalPrice']
        )

        delivery = DeliveryAddress.objects.create(
            order=order,
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            address=data['shippingAddress']['address'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['quantity'],
                price=i['price'],
            )
            if product.image:
                item.image = product.image.url
                item.save()

            product.countInStock -= item.quantity
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if (user.is_staff or order.user == user):
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {'detail': 'Nieautoryzowany użytkownik do wyświetlenia zamówienia.'}, status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({'detail': 'Zamówienie nie istnieje.'}, status=status.HTTP_401_UNAUTHORIZED)
