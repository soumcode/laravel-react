import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {Head, Link, router, usePage} from '@inertiajs/react';
import {Plus, Search } from 'lucide-react';

import TaskCard from "@/Components/TaskCard";
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export default function Index({tasks, filters}){
    const { flash } = usePage().props;
    const handleSearch = (event) => {
        const search = event.target.value;

        router.get("/tasks", {
            search,
            status: filters.status,
            priority: filters.priority,
        },
        {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Mes tâches" />

            <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-0">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Mes tâches
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Organisez votre journée et suivez vos progrès.
                        </p>
                    </div>

                    <Button asChild className="w-full md:w-auto shadow-md hover:shadow-lg transition-all">
                        <Link href={"/tasks/create"} className="flex items-center gap-2">
                            <Plus size={20} />
                            Nouvelle tâche
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-3 p-4 text-sm text-green-800 border border-green-200 rounded-xl bg-green-50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-green-100 p-1 rounded-full">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="md:col-span-6 relative">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Recherche</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                className="pl-10 bg-background"
                                placeholder="Rechercher une tâche ..."
                                defaultValue={filters.search || ""}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Statut</label>
                        <select
                            value={filters.status || ""}
                            onChange={(e) => {
                                router.get("/tasks", {
                                    search: filters.search,
                                    status: e.target.value,
                                    priority: filters.priority,
                                }, { preserveState: true });
                            }}
                            className="w-full rounded-md border bg-background p-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                        >
                            <option value="">Tous les statuts</option>
                            <option value="a_faire">À faire</option>
                            <option value="en_cours">En cours</option>
                            <option value="terminee">Terminées</option>
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block ml-1">Priorité</label>
                        <select
                            value={filters.priority || ""}
                            onChange={(e) => {
                                router.get("/tasks", {
                                    search: filters.search,
                                    status: filters.status,
                                    priority: e.target.value,
                                }, { preserveState: true });
                            }}
                            className="w-full rounded-md border bg-background p-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                        >
                            <option value="">Toutes les priorités</option>
                            <option value="faible">Faible</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="haute">Haute</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.data.length > 0 ? (
                        tasks.data.map((task) => <TaskCard key={task.id} task={task} />)
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-16 border-2 border-dashed rounded-3xl bg-muted/20 text-center space-y-4">
                            <div className="bg-muted p-4 rounded-full text-muted-foreground">
                                <Search size={48} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Aucune tâche trouvée</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">
                                    Nous n'avons trouvé aucune tâche correspondant à vos critères de recherche.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="mt-2">
                                <Link href={"/tasks/create"}>Créer une tâche</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
