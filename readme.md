# Tasks RestAPI ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)

✨ Save your tasks and personal reminders.

## Documentation
[You can review the documentation](https://documenter.getpostman.com/view/21748987/2s83YSJ6q7).

## 🚀 Setup
1. Clone this project.
2. Go to the project folder:
`cd tasks-restapi`
3. Install Node Dependencies:
`npm install`
4. Runs in the development mode.
`npm run dev`

## 🛠 Run
1. Once the dependencies are installed, you can run:
`npm start`

## ⚙️ Database Configuration
You can configure to use SQLite In-Memory:

## 📌 Project Structure
```bash
├── controllers
│   ├── auth.controller.js
│   ├── categories.controller.js
│   ├── roles.controller.js
│   └── auth.controller.js
├── db
│   ├── connection.js
│   ├── references.js
│   └── tasks.sqlite
├── helpers
│   ├── db-validator.js
│   ├── generateJWT.js
├── middlewares
│   ├── validate-fields.js
│   ├── validate-jwt.js
│   └── validate-roles.js
├── models
│   ├── category.js
│   ├── index.js
│   ├── role.js
│   ├── server.js
│   ├── task.js
│   └── user.js
├── public
│   └── index.html
├── routes
│   ├── auth.routes.js
│   ├── categories.routes.js
│   ├── roles.routes.js
│   └── auth.routes.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
```

## 🦀 Technologies
![Node badge](https://img.shields.io/badge/nodejs-JS-green)
![Express badge](https://img.shields.io/badge/expressjs-JS-yellow)
![SQLite badge](https://img.shields.io/badge/sqlite-SQL-blue)

## 🧾 License
The MIT License (MIT)

