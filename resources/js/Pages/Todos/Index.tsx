import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

type Todo = {
    id: number;
    title: string;
    done: boolean;
    created_at?: string;
    updated_at?: string;
};

export default function Index() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch("/api/todos")
            .then((r) => r.json())
            .then((data: Todo[]) => setTodos(data))
            .catch(console.error)
    }, []);

    const createTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const res = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });

        const created: Todo = await res.json();
        setTodos((prev) => [created, ...prev]);
        setTitle("");
    };

    const editTodo = async (todo: Todo) => {}

    const toggleDone = async (todo: Todo) => {
        const res = await fetch(`/api/todos/${todo.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: !todo.done }),
        });
        const updated: Todo = await res.json();

        setTodos(
            (prev) => prev.map((t) => (t.id === updated.id ? updated : t))
        );
    };

    const removeTodo = async (id: number) => {
        await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        });
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* ← ページのタイトル設定（<title>） */}
            <Head title="Todos" />

            {/* ← 見出し */}
            <h1 className="text-2xl font-bold mb-4">Todos</h1>

            {/* ← 新規作成フォーム */}
            <form onSubmit={createTodo} className="flex gap-2 mb-6">
                {/* ← 入力ボックス（タイトル） */}
                <input
                    value={title} // ← stateとバインド
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="やることを入力"
                    className="flex-1 border rounded px-3 py-2"
                />
                {/* ← 追加ボタン */}
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                    追加
                </button>
            </form>

            {/* ← 一覧表示 */}
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between border rounded px-3 py-2"
                    >
                        {/* ← 左側：チェック + タイトル */}
                        <label className="flex items-center gap-2">
                            {/* ← 完了チェックボックス（押すとtoggleDone実行） */}
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleDone(todo)}
                            />
                            {/* ← 完了なら取り消し線 */}
                            <span
                                className={
                                    todo.done
                                        ? "line-through text-gray-500"
                                        : ""
                                }
                            >
                                {todo.title}
                            </span>
                        </label>

                        {/* ← 右側：削除ボタン */}
                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="text-red-600 hover:underline"
                        >
                            削除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
