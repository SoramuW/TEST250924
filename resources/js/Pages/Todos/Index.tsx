import React from "react";

export default function Index() {
    const todos = [
        { id: 1, title: "買い物に行く", done: false },
        { id: 2, title: "Laravelの勉強", done: true },
    ];

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Todo一覧</h1>
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center space-x-2">
                        <input type="checkbox" checked={todo.done} readOnly />
                        <span
                            className={
                                todo.done ? "line-through text-gray-500" : ""
                            }
                        >
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
