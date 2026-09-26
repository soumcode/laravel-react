# TaskFlow

TaskFlow est une application web de gestion de tâches développée avec **Laravel**, **React** et **Inertia.js**.

Le projet a été réalisé dans un objectif d'apprentissage afin de comprendre comment utiliser Laravel comme backend tout en construisant une interface moderne avec React.

---

## Technologies utilisées

### Backend

* **Laravel**
* **PHP**
* **Eloquent ORM**
* **MySQL / SQLite**
* **Laravel Authentication**

### Frontend

* **React**
* **JavaScript / JSX**
* **Inertia.js**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**

### Outils

* **Vite**
* **Git**
* **GitHub**

---

## Objectif du projet

L'objectif de TaskFlow est de permettre à un utilisateur de gérer facilement ses tâches.

Chaque utilisateur peut :

* créer une tâche ;
* consulter ses tâches ;
* modifier une tâche ;
* supprimer une tâche ;
* rechercher une tâche ;
* filtrer les tâches ;
* définir une priorité ;
* définir un statut ;
* définir une date limite.

Le projet permet également de mettre en pratique la communication entre **Laravel et React grâce à Inertia.js**.

---

## Fonctionnalités

###  Authentification

Les utilisateurs peuvent :

* créer un compte ;
* se connecter ;
* se déconnecter ;
* accéder à leur espace personnel.

Les tâches sont associées à l'utilisateur connecté.

---

###  Gestion des tâches

Une tâche possède les informations suivantes :

* Titre
* Description
* Statut
* Priorité
* Date limite

Les statuts disponibles sont :

* `À faire`
* `En cours`
* `Terminée`

Les priorités disponibles sont :

* `Faible`
* `Moyenne`
* `Haute`

---

###  Recherche

L'utilisateur peut rechercher une tâche à partir de son titre ou de sa description.

Exemple :

```text
Recherche : React
```

L'application affiche uniquement les tâches correspondant à la recherche.

---

###  Filtres

Les tâches peuvent être filtrées selon :

* leur statut ;
* leur priorité.

---

###  Interface utilisateur

L'interface utilise **shadcn/ui** pour les composants et **Lucide React** pour les icônes.

Quelques composants utilisés :

* Button
* Card
* Input
* Textarea
* Label
* Badge
* Dialog

Exemple :

```jsx
<Button>
    <Plus />
    Nouvelle tâche
</Button>
```

---

##  Architecture du projet

La partie React se trouve principalement dans :

```text
resources/
└── js/
    ├── Components/
    │   ├── TaskCard.jsx
    │   └── TaskForm.jsx
    │
    ├── Layouts/
    │   └── AuthenticatedLayout.jsx
    │
    └── Pages/
        ├── Dashboard.jsx
        └── Tasks/
            ├── Index.jsx
            ├── Create.jsx
            └── Edit.jsx
```

La partie Laravel est organisée principalement autour de :

```text
app/
├── Http/
│   └── Controllers/
│       └── TaskController.php
│
└── Models/
    └── Task.php
```

Les routes se trouvent dans :

```text
routes/
└── web.php
```

Les migrations se trouvent dans :

```text
database/
└── migrations/
```

---

##  Architecture Laravel + React + Inertia

TaskFlow utilise Inertia.js pour faire communiquer Laravel et React.

Le fonctionnement général est :

```text
Utilisateur
     │
     ▼
    React
     │
     │ Inertia
     ▼
   Laravel
     │
     ├── Controller
     │
     ├── Validation
     │
     └── Eloquent
          │
          ▼
       Database
```

Par exemple, lorsqu'un utilisateur crée une tâche :

```text
Formulaire React
      │
      ▼
useForm()
      │
      ▼
post("/tasks")
      │
      ▼
Inertia.js
      │
      ▼
Laravel
      │
      ▼
TaskController
      │
      ▼
Validation
      │
      ▼
Task::create()
      │
      ▼
Database
```

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE_USERNAME/laravel-react.git
```

Entrer dans le projet :

```bash
cd laravel-react
```

---

### 2. Installer les dépendances PHP

```bash
composer install
```

---

### 3. Installer les dépendances JavaScript

```bash
npm install
```

---

### 4. Configurer le fichier `.env`

Copier le fichier `.env.example` :

```bash
cp .env.example .env
```

Générer la clé Laravel :

```bash
php artisan key:generate
```

---

## 🗄️ Configuration de la base de données

Dans `.env`, configurer les informations de connexion à la base de données.

### Exemple avec MySQL

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskflow
DB_USERNAME=root
DB_PASSWORD=
```

Créer ensuite la base de données :

```sql
CREATE DATABASE taskflow;
```

Puis lancer les migrations :

```bash
php artisan migrate
```

---

##  Lancer le projet

Lancer Laravel :

```bash
php artisan serve
```

Dans un autre terminal, lancer Vite :

```bash
npm run dev
```

L'application sera disponible à l'adresse :

```text
http://127.0.0.1:8000
```

---

## Installation de shadcn/ui

Si shadcn/ui n'est pas encore configuré :

```bash
npx shadcn@latest init
```

Puis installer les composants nécessaires :

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add badge
npx shadcn@latest add dialog
```

---

##  Lucide React

Installer Lucide React :

```bash
npm install lucide-react
```

Exemple :

```jsx
import { Plus, Pencil, Trash2 } from "lucide-react";
```

Utilisation :

```jsx
<Button>
    <Plus />
    Nouvelle tâche
</Button>
```

---

##  Routes principales

| Méthode   | URL                  | Fonction                |
| --------- | -------------------- | ----------------------- |
| GET       | `/dashboard`         | Dashboard               |
| GET       | `/tasks`             | Liste des tâches        |
| GET       | `/tasks/create`      | Formulaire de création  |
| POST      | `/tasks`             | Créer une tâche         |
| GET       | `/tasks/{task}/edit` | Modifier une tâche      |
| PUT/PATCH | `/tasks/{task}`      | Mettre à jour une tâche |
| DELETE    | `/tasks/{task}`      | Supprimer une tâche     |

Les routes sont protégées par l'authentification.

---

## Modèle Task

Le modèle `Task` possède les attributs suivants :

```text
id
user_id
title
description
status
priority
due_date
created_at
updated_at
```

### Statut

```text
a_faire
en_cours
terminee
```

### Priorité

```text
faible
moyenne
haute
```

---

##  Concepts appris

Ce projet permet de mettre en pratique plusieurs concepts.

### Laravel

* Routes
* Controllers
* Models
* Eloquent
* Migrations
* Relations
* Validation
* Authentication
* Middleware
* CRUD
* Pagination

### React

* Components
* Props
* JSX
* State
* Events
* Forms
* `useForm`
* `map()`
* Conditional rendering

### Inertia.js

* `Inertia::render()`
* `Link`
* `router`
* `useForm`
* Transmission des données Laravel → React
* Navigation sans rechargement complet de la page

### UI

* Tailwind CSS
* shadcn/ui
* Lucide React
* Components réutilisables

---

##  Exemple de composant React

Un composant simple :

```jsx
export default function TaskCard({ task }) {
    return (
        <div>
            <h2>{task.title}</h2>

            <p>
                {task.description}
            </p>
        </div>
    );
}
```

Utilisation :

```jsx
<TaskCard task={task} />
```

---

##  Exemple avec Inertia

Laravel :

```php
return Inertia::render('Tasks/Index', [
    'tasks' => $tasks,
]);
```

React :

```jsx
export default function Index({ tasks }) {
    return (
        <div>
            {tasks.data.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}
```

---

##  Améliorations possibles

Plusieurs fonctionnalités peuvent être ajoutées dans une prochaine version :

* [ ] Catégories de tâches
* [ ] Tags
* [ ] Notifications
* [ ] Tâches favorites
* [ ] Tableau Kanban
* [ ] Drag & Drop
* [ ] Mode sombre
* [ ] Dashboard avec statistiques réelles
* [ ] Pagination avancée
* [ ] Confirmation de suppression avec Dialog shadcn/ui
* [ ] Tests automatisés
* [ ] API REST
* [ ] Upload de fichiers
* [ ] Système de commentaires
* [ ] Notifications par email

---

##  Aperçu

### Dashboard

```text
┌─────────────────────────────────────────────┐
│ TaskFlow                    Dashboard       │
├─────────────────────────────────────────────┤
│                                             │
│ Bonjour 👋                                  │
│ Bienvenue sur TaskFlow                      │
│                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │    12    │ │     5    │ │     7    │     │
│ │  Total   │ │ En cours │ │ Terminées│     │
│ └──────────┘ └──────────┘ └──────────┘     │
│                                             │
└─────────────────────────────────────────────┘
```

### Liste des tâches

```text
┌─────────────────────────────────────────────┐
│ Mes tâches                   [+ Nouvelle]   │
│                                             │
│ 🔍 Rechercher une tâche...                  │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Apprendre React          [En cours]     │ │
│ │ Comprendre les composants               │ │
│ │                                         │ │
│ │ [Modifier] [Supprimer]                  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Auteur

Projet réalisé dans le cadre de l'apprentissage de :

**Laravel + React + Inertia.js**

Technologies principales :

```text
Laravel
React
Inertia.js
Tailwind CSS
shadcn/ui
Lucide React
```

---

## 📄 Licence

Ce projet est réalisé à des fins d'apprentissage et peut être librement utilisé, modifié et amélioré.
