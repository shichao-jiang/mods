from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
import maskdecoder
import base64
from PIL import Image
from io import BytesIO

def index(request):
    return render(request, 'index.html')


from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def upload(request):
    file = request.POST['file']
    img = Image.open(BytesIO(base64.b64decode(file)))
    img.save('img.png')

    result = maskdecoder.predict('img.png')
    return HttpResponse(maskdecoder.predict('img.png'))


