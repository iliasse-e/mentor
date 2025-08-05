# 🧑‍🏫 Mentorat App – Projet NestJS

Application web développée avec NestJS, visant à faciliter la mise en relation entre mentors et mentorés. Ce projet s’appuie sur une architecture modulaire et intègre une base de données relationnelle gérée via Docker et manipulée avec TypeORM.

## 🚀 Fonctionnalités principales

- Gestion d'ajoute de matières
- API REST structurée avec NestJS
- ORM intégré via TypeORM

## 🛠️ Technologies

- **NestJS** – Framework back-end Node.js
- **TypeORM** – ORM pour la base de données
- **Docker** – Conteneurisation de la base de données
- **MariaDB** – SGBD utilisé dans le conteneur Docker
- **DBeaver** – Client SQL recommandé pour explorer et manipuler la base

---

## 🧰 Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org/) (version recommandée ≥ 18)
- [Docker](https://www.docker.com/) – Utilisé pour exécuter l’image PostgreSQL de la base de données
- [DBeaver](https://dbeaver.io/) (optionnel mais recommandé) – Pour interagir avec la base MariaDB

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/iliasse-e/mentor.git
cd mentor

# Installer les dépendances
npm install

# Lancer docker
docker-compose up -d

# Lancer le server Nest
nest start

# Le mieux est d'utiliser la commande suivante qui lance la commande docker et le server Nest
npm run start:dev
```
