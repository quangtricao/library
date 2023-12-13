![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![MUI](https://img.shields.io/badge/MUI-v.5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-blue)

# Introduction

Frontend of an online library platform. Visit the website [here](https://cqtri-fsproject.netlify.app/).

## Table of contents

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Project structure](#project-structure)

## Architecture



## Technologies

- Typescript
- React
- Redux (Redux Toolkit)
- React Router
- Material UI

## Getting started

1. Clone the repository: `git clone https://github.com/quangtricao/fs16-front-end-FS.git`
2. Install project dependencies: `npm install`
3. Run in development environment: `npm start`

Or visit the deployed [website](https://cqtri-fsproject.netlify.app/).

## Project structure

```console
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── index.html
│   └── library.ico
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── images
│   │       └── library.jpg
│   ├── components
│   │   ├── AccountInformation.tsx
│   │   ├── BookBorrowed.tsx
│   │   ├── BookInCartPreview.tsx
│   │   ├── BookPreview.tsx
│   │   ├── BookPreviewButton.tsx
│   │   ├── BooksTrending.tsx
│   │   ├── CheckAdmin.tsx
│   │   ├── CheckLogin.tsx
│   │   ├── Checkout.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Introduction.tsx
│   │   ├── Layout.tsx
│   │   ├── Loading.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Service.tsx
│   │   ├── SignupForm.tsx
│   │   └── Subscribe.tsx
│   ├── config
│   │   ├── api.ts
│   │   └── router.tsx
│   ├── index.tsx
│   ├── pages
│   │   ├── Account.tsx
│   │   ├── AccountEdit.tsx
│   │   ├── Authors.tsx
│   │   ├── Book.tsx
│   │   ├── BookEdit.tsx
│   │   ├── Books.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── hooks.ts
│   │   ├── slices
│   │   │   ├── accountSlice.ts
│   │   │   ├── authorsSlice.ts
│   │   │   ├── booksAuthorsSlice.ts
│   │   │   ├── booksGenresSlice.ts
│   │   │   ├── booksSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── genresSlice.ts
│   │   └── store.ts
│   ├── services
│   │   ├── accountService.ts
│   │   ├── authorsService.ts
│   │   ├── booksAuthorsService.ts
│   │   ├── booksGenresSlice.ts
│   │   ├── booksService.ts
│   │   └── genresService.ts
│   ├── setupTests.ts
│   ├── types
│   │   ├── account.ts
│   │   ├── author.ts
│   │   ├── book.ts
│   │   ├── booksAuthors.ts
│   │   ├── booksGenres.ts
│   │   ├── cart.ts
│   │   ├── genre.ts
│   │   ├── pagination.ts
│   │   └── status.ts
│   └── utils
│       └── localStorage.ts
└── tsconfig.json

12 directories, 66 files
```