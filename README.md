# 🧑‍🏫 Mentor App

Application web développée avec NestJS, visant à faciliter la mise en relation entre mentors et mentorés. Ce projet s’appuie sur une architecture modulaire et intègre une base de données relationnelle gérée via Docker et manipulée avec TypeORM.

## 🚀 Fonctionnalités principales

- Gestion d'ajout de matières
- API REST structurée avec NestJS

## 🛠️ Technologies

- **NestJS** – Framework back-end Node.js
- **TypeORM** – ORM pour la base de données
- **Docker** – Conteneurisation de la base de données
- **MariaDB** – SGBD utilisé dans le conteneur Docker
- **DBeaver** – Client SQL recommandé pour explorer et manipuler la base
- **class-validator** – Pour la gestion de pipes et du typage des DTO

---

## 🏢 Architecture

Le modèle d'architecture suivant :

```bash
src/
├── feature/
│   ├── feature.controller.ts/
│   ├── feature.entity.ts/
│   ├── feature.model.ts/
│   ├── feature.service.ts/
│   └── feature.module.ts/
├── .../
├── app.module.ts/
└── main.ts
```

## 🧰 Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org/) (version recommandée ≥ 20)
- [Docker](https://www.docker.com/) – Utilisé pour exécuter l’image MariaDB de la base de données
- [DBeaver](https://dbeaver.io/) (optionnel mais recommandé) – Pour interagir avec la base MariaDB

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/iliasse-e/mentor.git
cd mentor

# Installer les dépendances
npm install

# Commande qui lance la commande docker et le server Nest
npm run start:dev

## Ou bien :

# Lancer docker
docker-compose up -d

# Lancer le server Nest
nest start
```

## TODO

### CourseService

#### Méthode delete :

Implémenter le soft delete.
