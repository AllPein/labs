# Лабораторная работа №2

## Задание
Простой http-сервер. Имеется форма регистрации и логина. Также вохможна отправка сообщений от одного пользователя другому. Доступен список всех сообщений, а также их просмотр. Сообщения хранятся в базе (например sqlite)

## Решение
Проект разбит на 2 папки:

- `client` - Фронтенд для работы с сервером
- `server` - http-server

### Stack

Для фронта использовался [React](https://react.dev/)

Для сервера node.js + nest.js + prisma

База данных - sqlite

### Getting Started
Для локального запуска клиента необходимо установить [node](https://nodejs.org/en) версии 18 и выше

> Я использую pnpm для управлением зависимостями

#### Frontend
```bash
cd client
npm install
npm run dev
```
сайт запущен на http://locahost:5173/

#### Server
```bash
cd server
npm install
npx prisma migrate dev --name init
npm run start
```

### Auth
В проекте используется jwt авторизация
