from django.http import Http404
from django.shortcuts import render
from .data import TASKS

def home(request):
    topic = request.GET.get("topic", "")
    q = request.GET.get("q", "").strip().lower()
    tasks = TASKS
    if topic:
        tasks = [t for t in tasks if t["topic"] == topic]
    if q:
        tasks = [t for t in tasks if q in (t["title"] + " " + t["prompt"] + " " + t["topic"]).lower()]
    topics = sorted({t["topic"] for t in TASKS})
    return render(request, "ege/home.html", {"tasks": tasks, "topics": topics, "selected_topic": topic, "query": request.GET.get("q", "")})

def task_detail(request, task_id):
    task = next((t for t in TASKS if t["id"] == task_id), None)
    if task is None:
        raise Http404("Задание не найдено")
    return render(request, "ege/task.html", {"task": task})
