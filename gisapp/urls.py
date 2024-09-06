from django.urls import path, include
from .views import index,login,signup,signout
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('index',index, name='index'),
    path("login", login, name="login"),
    path("signup", signup, name="signup"),
    path("signout", signout, name="signout"),

]   
 