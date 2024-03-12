from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser


class AppUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'is_active', 'is_staff', 'is_sharer')
    search_fields = ('email', 'username')
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_sharer', 'groups', 'user_permissions', 'follows')}),
        ('Profile Picture', {'fields': ('profile_picture',)}), 
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_sharer', 'profile_picture')},  # Include profile_picture field here
        ),
    )


# @admin.register(Rating)
# class RatingAdmin(admin.ModelAdmin):
#     list_display = ('user', 'rating', 'comments', 'created_at')
#     search_fields = ('user__username', 'comments')
#     list_filter = ('created_at',)

admin.site.register(AppUser, AppUserAdmin)
