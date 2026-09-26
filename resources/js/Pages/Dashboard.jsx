import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, ListTodo, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Bonjour 👋
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Bienvenue sur TaskFlow. Voici l'état de vos projets.
                        </p>
                    </div>
                    <Button asChild className="shadow-md hover:shadow-lg transition-all">
                        <Link href="/tasks" className="flex items-center gap-2">
                            Voir mes tâches
                            <ArrowRight size={18} />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 border-border/60">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10">
                                    <ListTodo size={20} />
                                </div>
                                Total
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-black tracking-tighter">
                                {stats.total}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Tâches créées au total</p>
                        </CardContent>
                    </Card>

                    <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 border-border/60">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-muted-foreground group-hover:text-blue-600 transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                                    <Clock size={20} />
                                </div>
                                En cours
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-black tracking-tighter">
                                {stats.in_progress}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Tâches en cours de réalisation</p>
                        </CardContent>
                    </Card>

                    <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 border-border/60">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-muted-foreground group-hover:text-green-600 transition-colors">
                                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100">
                                    <CheckCircle2 size={20} />
                                </div>
                                Terminées
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-black tracking-tighter">
                                {stats.completed}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Tâches accomplies avec succès</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 text-center space-y-4">
                    <h3 className="text-xl font-bold">Prêt à être productif ?</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Organisez vos idées, fixez vos priorités et atteignez vos objectifs plus rapidement.
                    </p>
                    <Button asChild size="lg" className="px-8">
                        <Link href="/tasks/create">Créer ma première tâche</Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
