# TalTech Geological Localities Viewer

A simple Nuxt 4 application that allows users to browse geological localities using the public API:

https://rwapi.geoloogia.info/api/v1/public/localities

## Features

- Server-side data fetching using `useAsyncData`
- Server-side pagination (limit & offset)
- Search functionality using `name__icontains`
- TypeScript interfaces for API responses
- Responsive UI built with Tailwind CSS
- Graceful error handling

## Tech Stack

- Nuxt 4
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS

## Installation

```bash
npm install
npm run dev