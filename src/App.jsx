import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    if (!window.confirm("Add this task?")) return;

    setItems([...items, { id: Date.now(), text: task, checked: false }]);
    setTask("");
  };

  const toggleCheck = (id) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, checked: !i.checked } : i
    ));
  };

  const deleteSelected = () => {
    if (!window.confirm("Delete selected tasks?")) return;
    setItems(items.filter(i => !i.checked));
  };

  const selectedCount = items.filter(i => i.checked).length;

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-6">

          <h1 className="text-3xl font-bold text-white text-center mb-6">
            ToDoList
          </h1>

          {/* Input Row */}
          <div className="flex gap-3 mb-4">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task"
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 outline-none"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.map(i => (
              <label
                key={i.id}
                className="flex items-center gap-3 bg-white/70 rounded-lg px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={i.checked}
                  onChange={() => toggleCheck(i.id)}
                  className="w-4 h-4"
                />
                <span className={i.checked ? "line-through opacity-60" : ""}>
                  {i.text}
                </span>
              </label>
            ))}
          </div>

          {/* Delete button — show only if multiple selected */}
          {selectedCount > 1 && (
            <button
              onClick={deleteSelected}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
            >
              Delete Selected
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
