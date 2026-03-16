import { useState, useEffect } from "react";

export default function ShoppingPage() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("shopping-items")) || [];
  });
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("shopping-items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (inputText.trim() === "") return;
    setItems([...items, { id: Date.now(), text: inputText, done: false }]);
    setInputText("");
  };

  const deleteItem = (id) => setItems(items.filter((item) => item.id !== id));

  const toggleDone = (id) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = () => {
    setItems(items.map((item) =>
      item.id === editingId ? { ...item, text: editText } : item
    ));
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen pt-24 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-tight" style={{ color: "#2563eb" }}>
        🛒 Alışveriş Listesi
      </h1>

      {/* EKLEME ALANI */}
      <div className="w-full flex justify-center mb-10 px-4">
        <div className="flex gap-3 max-w-lg w-full rounded-2xl shadow-lg p-4 backdrop-blur-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Ürün ekle... (Enter'a bas)"
            style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
            className="flex-1 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
          <button
            onClick={addItem}
            style={{ backgroundColor: "#2563eb" }}
            className="px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-200 hover:brightness-110 whitespace-nowrap"
          >
            + Ekle
          </button>
        </div>
      </div>

      {/* LİSTELEME */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: "#9ca3af" }} className="text-lg">Henüz ürün eklenmedi.</p>
        </div>
      ) : (
        <div className="w-full flex justify-center px-4">
          <ul className="max-w-4xl w-full gap-4 grid grid-cols-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl p-5 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200"
                style={{ backgroundColor: item.done ? "#f3f4f6" : "rgba(255, 255, 255, 0.95)", opacity: item.done ? 0.7 : 1 }}
              >
                {editingId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
                      className="flex-1 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                    <button
                      onClick={saveEdit}
                      style={{ backgroundColor: "#22c55e" }}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:shadow-lg transition-all duration-200 hover:brightness-110"
                    >
                      Kaydet
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleDone(item.id)}
                      className="w-5 h-5 shrink-0 cursor-pointer accent-blue-500"
                    />
                    <span
                      className="flex-1 text-base"
                      style={{
                        color: item.done ? "#9ca3af" : "#1f2937",
                        textDecoration: item.done ? "line-through" : "none",
                      }}
                    >
                      {item.text}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(item)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-lg">✏️</button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 text-lg">🗑️</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        )}
    </div>
  );
}