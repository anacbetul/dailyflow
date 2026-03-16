export default function Navbar({ activePage, setActivePage }) {
  const pages = [
    { id: "shopping", label: "🛒 Alışveriş" },
    { id: "notes", label: "📝 Notlar" },
    { id: "reminder", label: "⏰ Hatırlatıcı" },
  ];

  return (
    <nav style={{ backgroundColor: "#2563eb" }} className="fixed top-0 left-0 right-0 shadow-lg z-50 backdrop-blur-sm bg-opacity-95">
      <div className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-sm">✨ DailyFlow</h1>
        <div className="flex flex-wrap justify-center gap-3">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              style={
                activePage === page.id
                  ? { backgroundColor: "white", color: "#2563eb", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }
                  : { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }
              }
              className="px-5 py-2 rounded-full text-sm font-semibold border border-white transition-all duration-200 hover:brightness-110"
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}