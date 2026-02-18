import { useState } from "react";

export default function App() {

  /* ---------- STATE ---------- */
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  /* ---------- ADD TASK ---------- */
  const addTask = () => {
    if (!task.trim()) return;
    if (!window.confirm("Add this task?")) return;

    setItems([...items, { id: Date.now(), text: task, checked: false }]);
    setTask("");
  };

  /* ---------- TOGGLE CHECK ---------- */
  const toggleCheck = (id) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, checked: !i.checked } : i
    ));
  };

  /* ⭐ ---------- DELETE ONE ---------- */
  const deleteOne = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setItems(items.filter(i => i.id !== id));
  };

  /* ---------- DELETE MULTI ---------- */
  const deleteSelected = () => {
    if (!window.confirm("Delete selected tasks?")) return;
    setItems(items.filter(i => !i.checked));
  };

  const selectedCount = items.filter(i => i.checked).length;

  return (

    <div className="min-h-screen relative flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Wrapper */}
      <div className="relative z-10 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">

        {/* Glass Box */}
        <div className="
          backdrop-blur-md bg-white/20 border border-white/30
          rounded-2xl shadow-2xl
          p-4 sm:p-6 md:p-7
        ">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-5">
            ToDoList
          </h1>

          {/* Input Row */}
          <div className="flex gap-2 sm:gap-3 mb-4">

            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task"
              className="flex-1 px-3 py-2 rounded-lg bg-white/85 outline-none"
            />

            <button
              onClick={addTask}
              className="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold"
            >
              Add
            </button>

          </div>

          {/* Task List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">

            {items.map(i => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-3 bg-white/80 rounded-lg px-3 py-2"
              >

                {/* Left side — checkbox + text */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={i.checked}
                    onChange={() => toggleCheck(i.id)}
                  />

                  <span className={i.checked ? "line-through opacity-60" : ""}>
                    {i.text}
                  </span>
                </div>

                {/* ⭐ Single delete button */}
                <button
                  onClick={() => deleteOne(i.id)}
                  className="text-red-600 font-semibold hover:text-red-800"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

          {/* Multi Delete Button */}
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
