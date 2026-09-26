import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Flag, CircleDot, ArrowLeft } from "lucide-react";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        status: "a_faire",
        priority: "moyenne",
        due_date: "",
    });

    const submit = (event) => {
        event.preventDefault();

        post("/tasks");
    };

    return (
        <AuthenticatedLayout>

            <Head title="Nouvelle tâche" />

            <div className="max-w-3xl mx-auto space-y-8 p-4 md:p-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
                        <Link href="/tasks" className="flex items-center gap-2">
                            <ArrowLeft size={16} />
                            Retour aux tâches
                        </Link>
                    </Button>
                </div>

                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Nouvelle tâche
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Définissez vos objectifs et organisez votre travail.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold">
                                Titre de la tâche
                            </Label>
                            <Input
                                id="title"
                                placeholder="Ex: Finaliser le rapport mensuel"
                                className="text-lg h-12"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Détaillez les étapes à suivre..."
                                className="min-h-[150px] resize-none"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 bg-muted/30 p-6 rounded-2xl border border-border/50 h-fit">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                                <CircleDot size={16} className="text-primary" />
                                Statut
                            </div>
                            <select
                                id="status"
                                className="w-full rounded-md border bg-background p-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="a_faire">À faire</option>
                                <option value="en_cours">En cours</option>
                                <option value="terminee">Terminée</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                                <Flag size={16} className="text-primary" />
                                Priorité
                            </div>
                            <select
                                id="priority"
                                className="w-full rounded-md border bg-background p-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={data.priority}
                                onChange={(e) =>
                                    setData("priority", e.target.value)
                                }
                            >
                                <option value="faible">Faible</option>
                                <option value="moyenne">Moyenne</option>
                                <option value="haute">Haute</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                                <Calendar size={16} className="text-primary" />
                                Date limite
                            </div>
                            <Input
                                id="due_date"
                                type="date"
                                value={data.due_date}
                                onChange={(e) =>
                                    setData("due_date", e.target.value)
                                }
                            />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full shadow-md"
                            >
                                {processing
                                    ? "Création..."
                                    : "Créer la tâche"}
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                className="w-full"
                            >
                                <Link href="/tasks">Annuler</Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}
