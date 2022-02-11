from django.shortcuts import render,redirect

# Create your views here.
def home(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        context['segment'] = 'home'  
        return render(request,"core/home.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

def point_1(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        context['segment'] = 'point_1'  
        return render(request,"core/point_1.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

def point_2(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        context['segment'] = 'point_2'  
        return render(request,"core/point_2.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')

def point_3(request):
    # Si estamos identificados devolvemos la portada
    if request.user.is_authenticated:  
        context = {}
        context['segment'] = 'point_3'  
        return render(request,"core/point_3.html",context)
    # En otro caso redireccionamos al login
    return redirect('/login/')