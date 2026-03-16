import { useState, useEffect } from "react";

export default function ReminderPage() {
  const [reminders, setReminders] = useState(() => {
    return JSON.parse(localStorage.getItem("reminders")) || [];
  });
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (text.trim() === "" || date === "") return;
    setReminders([...reminders, { id: Date.now(), text, date, done: false }]);
    setText("");
    setDate("");
  };

  const deleteReminder = (id) => setReminders(reminders.filter((r) => r.id !== id));

  const toggleDone = (id) => {
    setReminders(reminders.map((r) =>
      r.id === id ? { ...r, done: !r.done } : r
    ));
  };

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditText(r.text);
    setEditDate(r.date);
  };

  const saveEdit = () => {
    setReminders(reminders.map((r) =>
      r.id === editingId ? { ...r, text: editText, date: editDate } : r
    ));
    setEditingId(null);
  };

  const sorted = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full flex flex-col items-center justify-center pt-24 py-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-tight" style={{ color: "#ea580c" }}>
        ⏰ Hatırlatıcılar
      </h1>

      {/* EKLEME */}
      <div className="w-full flex justify-center mb-10 px-4">
        <div className="rounded-2xl shadow-lg p-6 border border-orange-100 max-w-2xl w-full backdrop-blur-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ne hatırlatayım?"
          style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
          className="w-full border border-orange-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
          className="w-full border border-orange-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        />
        <button
          onClick={addReminder}
          style={{ backgroundColor: "#ea580c" }}
          className="w-full py-3 rounded-lg hover:shadow-lg text-white font-semibold transition-all duration-200 hover:brightness-110"
        >
          + Hatırlatıcı Ekle
        </button> 
        </div>
      </div>

      {/* LİSTE */}
      {sorted.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: "#9ca3ae" }} className="text-lg">Henüz hatırlatıcı yok.</p>
        </div>
      ) : (
        <div className="w-full flex justify-center px-4">
          <ul className="max-w-4xl w-full grid grid-cols-1 gap-4">
          {sorted.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl p-5 shadow-md border border-orange-100 hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: r.done ? "#f3f4f6" : "rgba(255, 255, 255, 0.95)", opacity: r.done ? 0.7 : 1 }}
            >
              {editingId === r.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
                    className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                  />
                  <input
                    type="datetime-local"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
                    className="w-full border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onClick={saveEdit}
                    style={{ backgroundColor: "#22c55e" }}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white hover:shadow-lg transition-all duration-200 hover:brightness-110"
                  >
                    💾 Kaydet
                  </button>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={r.done}
                    onChange={() => toggleDone(r.id)}
                    className="mt-2 w-5 h-5 shrink-0 cursor-pointer accent-orange-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-base"
                      style={{
                        color: r.done ? "#9ca3af" : "#1f2937",
                        textDecoration: r.done ? "line-through" : "none",
                      }}
                    >
                      {r.text}
                    </p>
                    <p className="text-sm mt-2" style={{ color: "#6b7280" }}>
                      📅 {new Date(r.date).toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => startEdit(r)} className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200 text-lg">✏️</button>
                    <button onClick={() => deleteReminder(r.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 text-lg">🗑️</button>
                  </div>
                </div>
              )
            }
            </li>
          ),
        )
      }
      </ul>
      
      </div>
      )
      }
    </div>
  );
}