# Tasks RestAPI ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)

โจ Save your tasks and personal reminders.

## Documentation
[You can review the documentation](https://documenter.getpostman.com/view/21748987/2s83YSJ6q7).

## ๐ Setup
1. Clone this project.
2. Go to the project folder:
`cd tasks-restapi`
3. Install Node Dependencies:
`npm install`
4. Runs in the development mode.
`npm run dev`

## ๐  Run
1. Once the dependencies are installed, you can run:
`npm start`

## โ๏ธ Database Configuration
You can configure to use SQLite In-Memory.

## ๐ Project Structure
```bash
โโโ controllers
โ   โโโ auth.controller.js
โ   โโโ categories.controller.js
โ   โโโ roles.controller.js
โ   โโโ tasks.controller.js
โ   โโโ auth.controller.js
โโโ db
โ   โโโ connection.js
โ   โโโ references.js
โ   โโโ tasks.sqlite
โโโ helpers
โ   โโโ db-validator.js
โ   โโโ generateJWT.js
โโโ middlewares
โ   โโโ validate-fields.js
โ   โโโ validate-jwt.js
โ   โโโ validate-roles.js
โ   โโโ validate-user-info.js
โโโ models
โ   โโโ category.js
โ   โโโ index.js
โ   โโโ role.js
โ   โโโ server.js
โ   โโโ task.js
โ   โโโ user.js
โโโ public
โ   โโโ index.html
โโโ routes
โ   โโโ auth.routes.js
โ   โโโ categories.routes.js
โ   โโโ roles.routes.js
โ   โโโ tasks.routes.js
โ   โโโ auth.routes.js
โโโ .env
โโโ .gitignore
โโโ package-lock.json
โโโ package.json
```

## ๐ฆ Technologies
![Node badge](https://img.shields.io/badge/nodejs-JS-green)
![Express badge](https://img.shields.io/badge/expressjs-JS-yellow)
![SQLite badge](https://img.shields.io/badge/sqlite-SQL-blue)

## ๐งพ License
The MIT License (MIT)

