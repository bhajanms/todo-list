// Import React hook for state management
import { useState } from "react";

export default function App() {

  /* =========================
     STATE MODULE
     =========================
     task  → stores current input text
     items → stores array of todo tasks
     Each task object:
     { id, text, checked }
  ========================== */

  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  /* =========================
     ADD TASK MODULE
     =========================
     - Prevent empty input
     - Ask confirmation
     - Add new task object
     - Reset input field
  ========================== */

  const addTask = () => {
    if (!task.trim()) return;                 // ignore empty text
    if (!window.confirm("Add this task?")) return;

    setItems([
      ...items,                               // keep old tasks
      { id: Date.now(), text: task, checked: false } // add new task
    ]);

    setTask("");                              // clear input
  };

  /* =========================
     CHECKBOX TOGGLE MODULE
     =========================
     - Toggle selected state
     - Uses map to update only
       the clicked task
  ========================== */

  const toggleCheck = (id) => {
    setItems(items.map(i =>
      i.id === id
        ? { ...i, checked: !i.checked }       // flip checked value
        : i
    ));
  };

  /* =========================
     MULTI DELETE MODULE
     =========================
     - Confirm deletion
     - Remove all checked tasks
  ========================== */

  const deleteSelected = () => {
    if (!window.confirm("Delete selected tasks?")) return;

    setItems(
      items.filter(i => !i.checked)           // keep only unchecked
    );
  };

  /* =========================
     SELECTION COUNT MODULE
     =========================
     Counts how many tasks are selected.
     Used to show delete button only
     when multiple items selected.
  ========================== */

  const selectedCount =
    items.filter(i => i.checked).length;

  /* =========================
     UI RENDER MODULE
  ========================== */

  return (

    // Full screen container + center layout
    <div className="min-h-screen relative flex items-center justify-center">

      {/* =========================
         BACKGROUND IMAGE MODULE
         =========================
         - Full screen image
         - Stored in public/bg.jpg
      ========================== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* =========================
         DARK OVERLAY MODULE
         =========================
         Improves text readability
      ========================== */}
      <div className="absolute inset-0 bg-black/40" />

      {/* =========================
         CONTENT WRAPPER
         =========================
         z-index ensures box appears
         above background
      ========================== */}
      <div className="relative z-10 w-full max-w-md mx-4">

        {/* =========================
           GLASS TODO CARD MODULE
           =========================
           Tailwind glass effect:
           blur + transparency
        ========================== */}
        <div className="
          backdrop-blur-md
          bg-white/20
          border border-white/30
          rounded-2xl
          shadow-2xl
          p-6
        ">

          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            ToDoList
          </h1>

          {/* =========================
             INPUT + ADD BUTTON ROW
          ========================== */}
          <div className="flex gap-3 mb-4">

            {/* Controlled input field */}
            <input
              value={task}                                 // bind to state
              onChange={(e) => setTask(e.target.value)}    // update state
              placeholder="Enter your task"
              className="
                flex-1 px-4 py-2
                rounded-lg
                bg-white/80
                outline-none
              "
            />

            {/* Add button */}
            <button
              onClick={addTask}                            // call addTask
              className="
                px-4 py-2
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                rounded-lg
                font-semibold
              "
            >
              Add
            </button>

          </div>

          {/* =========================
             TASK LIST MODULE
             =========================
             Map through items array
             and render each task
          ========================== */}
          <div className="space-y-2 max-h-60 overflow-y-auto">

            {items.map(i => (

              <label
                key={i.id}                                // React key
                className="
                  flex items-center gap-3
                  bg-white/70
                  rounded-lg
                  px-3 py-2
                "
              >

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={i.checked}
                  onChange={() => toggleCheck(i.id)}
                  className="w-4 h-4"
                />

                {/* Task text with strike-through if checked */}
                <span className={
                  i.checked
                    ? "line-through opacity-60"
                    : ""
                }>
                  {i.text}
                </span>

              </label>

            ))}

          </div>

          {/* =========================
             CONDITIONAL DELETE BUTTON
             =========================
             Show only if multiple
             tasks are selected
          ========================== */}
          {selectedCount > 1 && (
            <button
              onClick={deleteSelected}
              className="
                w-full mt-4
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-lg
                font-semibold
              "
            >
              Delete Selected
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
