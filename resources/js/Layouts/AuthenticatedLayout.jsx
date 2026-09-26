import { Link } from "@inertiajs/react";
import { LayoutDashboard, ListTodo, LogOut } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link
                        href="/dashboard"
                        className="text-xl font-bold"
                    >
                        TaskFlow
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            href="/tasks"
                            className="flex items-center gap-2"
                        >
                            <ListTodo size={18} />
                            Mes tâches
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Déconnexion
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {children}
            </main>
        </div>
    );
}
