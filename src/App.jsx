import { useState } from "react";

export default function App() {

  /* =========================
     STATE — stores app data
  ========================== */

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  /* =========================
     ADD TASK
  ========================== */

  const addTask = () => {
    if (!input.trim()) return;

    if (window.confirm("Add this task?")) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input,
          checked: false
        }
      ]);
      setInput("");
    }
  };

  /* =========================
     TOGGLE CHECKBOX
  ========================== */

  const toggleCheck = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, checked: !t.checked } : t
    ));
  };

  /* =========================
     DELETE ONE TASK
  ========================== */

  const deleteOne = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  /* =========================
     DELETE MULTIPLE
  ========================== */

  const deleteSelected = () => {
    if (window.confirm("Delete selected tasks?")) {
      setTasks(tasks.filter(t => !t.checked));
    }
  };

  /* =========================
     MULTI SELECT COUNT
  ========================== */

  const selectedCount = tasks.filter(t => t.checked).length;

  return (

    /* =========================
       PAGE WRAPPER
    ========================== */

    <div className="min-h-screen relative overflow-hidden">

      {/* 🎬 BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CENTER CONTAINER */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        {/* =========================
           GLASS CARD
        ========================== */}

        <div className="
          w-full max-w-md
          bg-white/15
          backdrop-blur-xl
          border border-white/25
          rounded-2xl
          shadow-2xl
          text-white
          p-7
        ">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-center mb-5">
            ToDoList
          </h1>

          {/* =========================
             INPUT ROW
          ========================== */}

          <div className="flex gap-2 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your task"
              className="flex-1 px-3 py-2 rounded bg-white/90 text-black outline-none"
            />

            <button
              onClick={addTask}
              className="bg-emerald-500 hover:bg-emerald-600 px-4 rounded font-medium"
            >
              Add
            </button>
          </div>

          {/* =========================
             MULTI DELETE BUTTON
             (only if >1 selected)
          ========================== */}

          {selectedCount > 1 && (
            <button
              onClick={deleteSelected}
              className="w-full mb-4 bg-red-500 hover:bg-red-600 py-2 rounded"
            >
              Delete Selected ({selectedCount})
            </button>
          )}

          {/* =========================
             TASK LIST
          ========================== */}

          <div className="space-y-2 max-h-64 overflow-y-auto">

            {tasks.map(task => (

              <div
                key={task.id}
                className="bg-white/90 text-black rounded-md px-3 py-2 flex justify-between items-center"
              >

                {/* LEFT SIDE */}
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleCheck(task.id)}
                  />

                  <span className={task.checked ? "line-through" : ""}>
                    {task.text}
                  </span>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteOne(task.id)}
                  className="text-red-600 font-semibold"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>
      </div>
    </div>
  );
}
