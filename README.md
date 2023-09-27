## Tutorial Source

https://www.youtube.com/watch?v=bHRe5XNP5l8

## Tutorial Git

https://github.com/LearnWebCode/laravel-course

## Original Git

https://github.com/thecodeholic/laravel-react-survey

## This Git

https://github.com/samedan/2302_Laravel_React_Survey

## TO DO

> errors on questions post/put

## tailwind

https://tailwindui.com/components

## Starting steps

> .env > php artisan migrate

> npm create vite@latest > npm i > npm run dev

> npm install -D tailwindcss postcss autoprefixer

> npm install @heroicons/react

## Signup steps

> Signup.jsx gets UserToken & CurrentUser

> Sends them to ContextProvider

> Updates GuestLayout and redirects to '/'

> saves TOKEN to localStorage

## Surveys

# Functions

> php artisan make:controller SurveyController --api

> php artisan make:resource SurveyResource

> php artisan make:request SurveyUpdateRequest

> php artisan make:request SurveyStoreRequest

# Database

![alt text](https://github.com/samedan/2302_Laravel_React_Survey/blob/main/public/schema_dbb.jpg?raw=true)

m=Model c=Controller r=resource R=Requests

> php artisan make:model Survey -mcrR

> php artisan make:model SurveyQuestion -m

> php artisan make:model SurveyAnswer -m

> php artisan make:model SurveyQuestionAnswer -m

> php artisan migrate

## Saving Answers

> SurveyPublicView.jsx -> answerChanged() -> Object.defineProperty()
