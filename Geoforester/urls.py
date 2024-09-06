
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path,include
from gisapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('gisapp/',include('gisapp.urls'))
] 
# + static(settings.STATIC_URL, document_root=settings.STATIC_URL)
