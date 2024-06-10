# Dynagraph

Система управления панелями индикаторов с возможностью загрузки и использования динамических модулей виджетов во время работы.

## Запуск

- создать файл `.env` по аналогии с `.env.example`
- выполнить `npm install`
- выполнить `npx prisma generate` для автоматической генерации типов сущностей
- выполнить `npx prisma db push` для создания таблиц и других объектов базы данных
- выполнить `npm run dev`

## Технологии

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
