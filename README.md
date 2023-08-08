# Projet de Gestion de Notes

Ce projet de gestion de notes est une application web basée sur Node.js qui permet aux utilisateurs de créer, afficher, mettre à jour et supprimer des notes. Il intègre des fonctionnalités d'authentification des utilisateurs à l'aide de JSON Web Tokens (JWT) pour garantir la sécurité des données.

# Fonctionnalités principales
Inscription et connexion sécurisées : Les utilisateurs peuvent créer un compte en fournissant un nom d'utilisateur et un mot de passe. L'authentification est gérée à l'aide de JWT pour une expérience utilisateur sécurisée.

Gestion des notes : Une fois connectés, les utilisateurs peuvent créer de nouvelles notes, afficher la liste de leurs notes existantes et les mettre à jour ou les supprimer.

Tri des notes : Les notes sont triées de manière antichronologique, montrant d'abord les notes les plus récentes.

Validation des formulaires : Les formulaires d'inscription et de connexion sont soumis à une validation pour garantir que les données saisies sont correctes et appropriées.

# Prérequis
Node.js : Assurez-vous d'avoir Node.js installé sur votre système.
# Installation
Clonez ce référentiel sur votre machine locale.
Exécutez npm install pour installer les dépendances nécessaires.
Configurez vos variables d'environnement en créant un fichier .env à la racine du projet.
# Utilisation
Exécutez node server.js pour démarrer le serveur.

Accédez à l'application dans votre navigateur à l'adresse http://localhost:3000.
