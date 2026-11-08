from django.contrib import admin
from django.urls import path
from ege.views import home, task_detail

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
    path("task/<int:task_id>/", task_detail, name="task_detail"),
]
