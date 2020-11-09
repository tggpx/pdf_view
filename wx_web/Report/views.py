from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render_to_response
from django.http import JsonResponse

def index(request): 
    #template = loader.get_template("Report/index.html")
    #return HttpResponse(template.render)
    return render_to_response('Report/index.html')

def test(request):
    if request.is_ajax() and request.method == "GET":
        print("ajax")
        data = request.GET
        name = data.get('PatientName')
        code = data.get('HospitalCode')
        print(name)
        print(code)
        return JsonResponse({'resCode':'0'})