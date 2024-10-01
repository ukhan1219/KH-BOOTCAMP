# KH BOOTCAMP

create t3 stack
`npm create t3-app@latest`

install npm if not installed
`npm install -g npm`

next steps:
- ```cd bootcamp```
-  ```Start up a database, if needed using './start-database.sh'```
-  `npm run db:push`
-  `npm run dev`
-  `git commit -m "initial commit"`

make sure docker is installed


## files/folders you may need to edit for a project:
### Frontend:
- src/app/_components (where you will add components to use such as navbar, or any other functionality)
- srs/app/page.tsx (main page, also in this directory is where you will define other pages)

### Backend:
- src/server/api/routers (where you will define funcitonality for the back end such as craeting a post, or deleting a post, etc)
- srcs/server/api/root.ts (where you will import all of the routers(functionality) you created to work with the frontend)

### Misc:
- primsa (edit database)
- .env (environment variables such as api keys)