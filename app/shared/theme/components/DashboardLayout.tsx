import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router";


const mockUser = {
  name: "Sebastian Rodriguez",
  email: "sebastian@example.com",
  avatar: "https://ui-avatars.com/api/?name=User&size=40"

};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[var(--color-neutral)]">
    <aside className={`dashboard-sidebar ${sidebarOpen ? "" : "hidden"}`}>
        <div className="p-6 text-white text-2xl font-bold">
            Finanzas App
        </div>
        <nav className="mt-2 flex flex-col gap-2">
            <a href="#">Inicio</a>
            <a href="#">Perfil</a>
            <a href="#">Ajustes</a>
            <a href="#">Cerrar sesión</a>
        </nav>
        </aside>

    <div className="flex-1 flex flex-col">
        <header className="dashboard-header">
            <div className="text-xl font-bold ml-1 text-[var(--color-primary)]">
                Dashboard
            </div>

            <div className="user-info mr-1">
                <img src={mockUser.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                <div className="font-medium">{mockUser.name}</div>
                <div className="text-sm">{mockUser.email}</div>
                </div>
            </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
    </div>
    </div>
  );
}