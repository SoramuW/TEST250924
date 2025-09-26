<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::orderByDesc('id')->get();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        // ← content は任意
        $data = $request->validate([
            'title'   => ['required', 'string', 'max:255'],
            'content' => ['sometimes', 'string'],
        ]);

        // ← 省略時は空文字で保存（NOT NULL 対策）
        $todo = Todo::create([
            'title'   => $data['title'],
            'content' => $data['content'] ?? '',
            'done'    => false,
        ]);

        return response()->json($todo, Response::HTTP_CREATED);
    }

    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'done'  => ['sometimes', 'boolean'],
        ]);

        $todo->update($data);

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->noContent();
    }
}
