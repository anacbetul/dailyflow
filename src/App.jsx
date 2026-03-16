import { useState } from "react";
import Navbar from "./components/Navbar";
import ShoppingPage from "./pages/ShoppingPage";
import NotesPage from "./pages/NotesPage";
import ReminderPage from "./pages/ReminderPage";

function App() {
  const [activePage, setActivePage] = useState("shopping");

  return (
    <div className="min-h-screen min-w-full" style={{ backgroundColor: "#f3f4f6" }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="w-full">
          {activePage === "shopping" && <ShoppingPage />}
          {activePage === "notes" && <NotesPage />}
          {activePage === "reminder" && <ReminderPage />}
      </main>
    </div>
  );
}

export default App;