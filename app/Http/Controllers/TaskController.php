<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $tasks = Task::where('user_id', auth()->id())
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->priority, function ($query, $priority) {
                $query->where('priority', $priority);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'priority' => $request->priority,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:a_faire,en_cours,terminee'],
            'priority' => ['required', 'in:faible,moyenne,haute'],
            'due_date' => ['nullable', 'date'],
        ]);

        $validated['user_id'] = auth()->id();

        Task::create($validated);

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Tâche créée avec succès.');
    }

    public function edit(Task $task): Response
    {
        abort_unless($task->user_id === auth()->id(), 403);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        abort_unless($task->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:a_faire,en_cours,terminee'],
            'priority' => ['required', 'in:faible,moyenne,haute'],
            'due_date' => ['nullable', 'date'],
        ]);

        $task->update($validated);

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Tâche modifiée avec succès.');
    }

    public function destroy(Task $task)
    {
        abort_unless($task->user_id === auth()->id(), 403);

        $task->delete();

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Tâche supprimée.');
    }
}
