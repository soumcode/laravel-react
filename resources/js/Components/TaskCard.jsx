import {Link, router} from "@inertiajs/react";
import {Pencil, Trash2, AlertCircle, CheckCircle2, Clock} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

export default function TaskCard({ task }){
    const deleteTask = () => {
        if(confirm("Voulez vous vraiment supprimer cette tâche ?")){
            router.delete(`/task/${task.id}`);
        }
    };

    const statusConfig = {
        a_faire: { label: "À faire", color: "bg-slate-100 text-slate-700 border-slate-200", icon: Clock },
        en_cours: { label: "En cours", color: "bg-blue-100 text-blue-700 border-blue-200", icon: AlertCircle },
        terminee: { label: "Terminée", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
    };

    const priorityConfig = {
        faible: { label: "Faible", color: "text-slate-500" },
        moyenne: { label: "Moyenne", color: "text-orange-500" },
        haute: { label: "Haute", color: "text-red-600 font-bold" },
    };

    const status = statusConfig[task.status] || statusConfig.a_faire;
    const priority = priorityConfig[task.priority] || priorityConfig.faible;
    const StatusIcon = status.icon;

    return(
        <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60 overflow-hidden">
            <div className={`h-1 w-full ${task.priority === 'haute' ? 'bg-red-500' : task.priority === 'moyenne' ? 'bg-orange-500' : 'bg-slate-400'}`} />

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                            {task.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-[10px] px-2 py-0 ${status.color} border`}>
                                <StatusIcon size={10} className="mr-1" />
                                {status.label}
                            </Badge>
                            <span className={`text-[10px] uppercase tracking-wider ${priority.color}`}>
                                {priority.label}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[40px]">
                    {task.description || "Aucune description fournie pour cette tâche."}
                </p>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/40">
                    <Button asChild variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10 hover:text-primary transition-colors">
                        <Link href={`/tasks/${task.id}/edit`} className="flex items-center gap-1.5">
                            <Pencil size={14} />
                            Modifier
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={deleteTask}
                        className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <Trash2 size={14} className="mr-1.5" />
                        Supprimer
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

