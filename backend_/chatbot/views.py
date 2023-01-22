import os

import openai
from django.http import HttpRequest, HttpResponse
from django.http.response import JsonResponse

openai.api_key = os.environ.get("OPENAI_API_KEY")

# Create your views here.
def chatbot(request: HttpRequest) -> HttpResponse:
    if not (query_params := request.GET.get("query")):
        return HttpResponse(status=400)

    user_input = query_params + "\n Tell me in the context of Nepali tourism."
    print(user_input)
    response = openai.Completion.create(
        model="text-curie-001",
        # prompt="Human: " + user_input,
        prompt="Hello There",
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
        stop=['"'],
    )
    return JsonResponse({"response": response}, status=200, safe=False)
