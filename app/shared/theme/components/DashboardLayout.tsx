import { useUser } from "@supabase/auth-helpers-react";

import { NavLink, Outlet } from "react-router";
import ButtonSignOut from "~/domains/auth/signout/ButtonSignOut";


const mockUser = {
  name: "Sebastian Rodriguez",
  email: "sebastian@example.com",
  avatar: "https://ui-avatars.com/api/?name=User&size=40"

};

export default function Dashboard() {

   const user = useUser();

  return (
    <div className="flex h-screen bg-[var(--color-neutral)]">
    <aside className={`dashboard-sidebar`}>
            <div className="p-6 text-white text-2xl font-bold">
                Finanzas App
            </div>
            <nav className="mt-2 flex flex-col gap-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded hover:bg-[var(--color-primary-light)] ${
                            isActive ? "bg-[var(--color-secondary)] text-white" : "text-white"
                        }`
                    }
                    >
                    Inicio
                </NavLink>
                <NavLink
                    to="/expenses"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded hover:bg-[var(--color-primary-light)] ${
                            isActive ? "bg-[var(--color-secondary)] text-white" : "text-white"
                        }`
                    }
                    >
                    Gastos
                </NavLink>
                <NavLink
                    to="/savings"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded hover:bg-[var(--color-primary-light)] ${
                            isActive ? "bg-[var(--color-secondary)] text-white" : "text-white"
                        }`
                    }
                >
                    Ahorros
                </NavLink>
                <ButtonSignOut />
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
                 <div className="text-sm">{user?.email}</div>
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