<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sortDirection', "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request('name') . "%");
        }

        if (request("status")) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        /** @var \Illuminate\Http\UploadedFile|null $image */
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        $project = Project::create($data);
        return to_route('project.index')->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $project->tasks();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sortDirection', "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request('name') . "%");
        }

        if (request("status")) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        // dd($data);
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        // /** @var \Illuminate\Http\UploadedFile|null $image */
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        // $project->update($request->validate());
        $project->update($data);
        return to_route('project.index')->with('success', "Project \"$project->name\" was updated ");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}



4.32.41