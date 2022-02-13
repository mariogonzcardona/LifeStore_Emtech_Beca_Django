from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as do_login
from django.contrib.auth import logout as do_logout
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
# Funcion para iniciar sesion
@csrf_exempt
def login(request):
    # Creamos el formulario de autenticacion vacio
    success=False
    form=AuthenticationForm()
    if request.method=="POST":
        # Añadimos los datos recibidos al formulario
        form=AuthenticationForm(data=request.POST)
        # Si el formulario es valido
        if form.is_valid():
            # Recuperamos las credenciales validas
            username=form.cleaned_data['username']
            password=form.cleaned_data['password']
    
            # Verificamos las credenciales del usuario
            user=authenticate(username=username,password=password)

            # Si existe el usuario con ese nombre y constraseña 
            if user is not None:
                # Hacemos el login manualmente
                do_login(request,user)
                # Redireccionamos a home
                success=True
                return JsonResponse({"isLogged":success,"username":username})
        else:
            success=False
            return JsonResponse({"isLogged":success})
            
    # Si llegamos al final renderizamos el formulario
    return render(request,'login/login.html',{"form":form})

# Funcion para cerrar sesion
def logout(request):
    # Finalizamos la sesion
    do_logout(request)
    # Redireccionamos a login
    return redirect('/')