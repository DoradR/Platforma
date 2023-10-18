from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *


class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'is_staff']
    # Określ pola tylko do odczytu, w tym 'date_joined'
    readonly_fields = ('date_joined',)

    def get_readonly_fields(self, request, obj=None):
        # Dodaj 'date_joined' do listy pól tylko do odczytu
        readonly_fields = list(super().get_readonly_fields(request, obj))
        readonly_fields.append('date_joined')
        return readonly_fields


admin.site.register(MyUser, UserAdmin)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(DeliveryAddress)
admin.site.register(VideoCourse)
