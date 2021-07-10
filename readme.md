Projet 6 de la formation Développeur Web - OpenClassrooms
Jordan LESUR

!!! Pour faire fonctionner ce projet, vous aurez besoin d'un .env qui contient l'URL de connexion à la base de données (DATABASE_URL_USER) !!!

## So Pekocko

Pour faire fonctionner le projet, vous devez installer :
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 
- [Angular CLI](https://github.com/angular/angular-cli) en version 7.0.2.
- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.
- nodemon : ``` npm install -g nodemon```

Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

## Démarrage des serveurs

Il faut ouvrir deux terminaux distincs

Dans le premier :
```bash
cd frontend
npm install
ng serve
```

Dans le second :
```bash
cd backend
npm install
nodemon server
```

## Consulter le site

Rendez-vous sur http://localhost:4200/
