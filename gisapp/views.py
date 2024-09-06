from django.shortcuts import render , HttpResponse , redirect
from django.contrib import messages
from django.contrib.auth.models import User
from  django.contrib.auth import authenticate , login as auth_login , logout
from django.contrib.auth.decorators import login_required

@login_required(login_url="login")
# Create your views here.
def index (request):
    return render (request, 'gisapp/index.html')


def login(request):
    if request.method == "POST":
        uname = request.POST['uname']
        pass1 = request.POST['pass1']
        print(uname, pass1)
        user = authenticate(username=uname , password=pass1 )
        if user is not None:
            auth_login(request,user)
            fname=user.first_name
            return render(request,'gisapp/index.html', {'fname':fname})
        else:
            messages.error(request,"Username or password is incorrect") 
            return redirect('login')   

    return render(request, "gisapp/login.html") 

def signup(request):
    if request.method=="POST":
        uname=request.POST['username']
        fname=request.POST['firstname']
        lname=request.POST['lastname']
        email=request.POST['email']
        password=request.POST['password']
        cpass=request.POST['confmpsswd']
        myuser = User.objects.create_user(uname,email,password)
        myuser.first_name=fname
        myuser.last_name=lname
        myuser.save()
        messages.success(request, "your account has been successfully created")
        return redirect("login")
    return render(request, "gisapp/signup.html")     

def signout(request):
    logout(request)
    messages.success(request, "logout successfully")  
    return redirect('login')