import { useState, useEffect } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (title.trim() === "") return;
    setNotes([...notes, {
      id: Date.now(), title, content,
      date: new Date().toLocaleDateString("tr-TR"),
    }]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    setNotes(notes.map((n) =>
      n.id === editingId ? { ...n, title: editTitle, content: editContent } : n
    ));
    setEditingId(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-24 py-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12 tracking-tight" style={{ color: "#7c3aed" }}>
        📝 Notlarım
      </h1>

      {/* EKLEME */}
      <div className="rounded-2xl shadow-lg p-6 mb-10 border border-purple-100 max-w-2xl mx-auto w-full backdrop-blur-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Not başlığı..."
          style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
          className="w-full border border-purple-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Not içeriği..."
          rows={4}
          style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
          className="w-full border border-purple-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none transition-all duration-200"
        />
        <button
          onClick={addNote}
          style={{ backgroundColor: "#7c3aed" }}
          className="w-full py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-200 hover:brightness-110"
        >
          + Not Ekle
        </button>
      </div>

      {/* LİSTE */}
      {notes.length === 0 ? (
        <div className="text-center py-12 px-4">
          <p style={{ color: "#9ca3af" }} className="text-lg">Henüz not eklenmedi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
                    className="w-full border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    style={{ color: "#1f2937", backgroundColor: "#f9fafb" }}
                    className="w-full border border-purple-200 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
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
                <>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg" style={{ color: "#1f2937" }}>{note.title}</h3>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ color: "#6b7280", backgroundColor: "#f3f4f6" }}>{note.date}</span>
                  </div>
                  {note.content && (
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "#6b7280" }}>{note.content}</p>
                  )}
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => startEdit(note)} className="px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-sm font-medium" style={{ color: "#7c3aed" }}>✏️ Düzenle</button>
                    <button onClick={() => deleteNote(note.id)} className="px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium" style={{ color: "#ef4444" }}>🗑️ Sil</button>
                  </div>
                </>
              )}
            </div>
        ),
    ) }      
        </div>
      )}
    </div>
  );}
    
