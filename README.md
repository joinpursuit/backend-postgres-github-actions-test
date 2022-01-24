# CTA - Cumulative Technical Assessment -

## This is the final assessment for Modules 1-4

This assessment will touch on all the knowledge you've gained in the last few modules.

To do this, you'll be building a `Snack-a-log` - a single model CRUD app API, using RESTful routes and consuming it with a `create-react-app` front-end.

This is an individual assessment, so you may not consult your peers or anyone outside of your instructors.

This assessment is open book - you may reference your notes, previous work and use MDN/W3 schools

Your instructors will be available to clarify instructions or help with technical issues.

You will be given 8 hours to complete this backend and then another 8 the following day to complete the front-end. If you are 6 hours in and don't think you will complete all the tests, please reach out to your instructor to get guidance on prioritizing what you should work on.

It is strongly encouraged/recommended that you only work on the back-end on Day 1 and get plenty of rest for the second day, when you will build the Create-React-App front end.

## Specific README's

- [Back-end README](./README_BE.md)
- [Front-end README](./README_FE.md)

## Competencies

### Day 1 - Back-end API

|          General           |             Specific             |                                                  How you'll be tested                                                  |
| :------------------------: | :------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
|     Use basic Git flow     |            git clone             |                             clone a template version of this repository onto your computer                             |
|     Use basic Git flow     |             git add              |                                          add your changes to the staging area                                          |
|     Use basic Git flow     |            git commit            |                                       commit your changes from the stating area                                        |
|     Use basic Git flow     |             git push             |                                              push your changes to GitHub                                               |
|  Constants and Variables   |            const/let             |                     Use const and let throughout your back-end to declare variables and constants                      |
|        Control Flow        |            404 Route             |                         Use control flow to redirect to a 404 message, if the route is invalid                         |
|        Control Flow        |      Snack Health: Boolean       |         Write some logic to determine the health of the snack, with given parameters (see more details below)          |
| Solve problem with Strings |        Change Snack Name         |                                    Write some logic to alter the name of the snack                                     |
| Solve problem with Objects |           Snack Object           |                                        Access and change values inside objects                                         |
|  Use promises/async await  |          Database calls          |                       Make calls to the database and wait for response before returning a value                        |
|            NPM             |       Install NPM packages       |                   Install packages already listed in the `package.json` , add new packages as needed                   |
|          Express           |         Build a JSON API         |                         Use Express to build a JSON API that will be used by a React front-end                         |
|       RESTful Routes       | Build an API with RESTful Routes |                              Use the RESTful pattern to build routes in your Express API                               |
|         SQL Schema         |       Create a SQL Schema        |                                          Build a Schema for the snacks model                                           |
|         SQL Basics         |        Write SQL Commands        | Write SQL for querying all data in a table, one item in a table, adding data to a table and deleting data from a table |
|   Express Configuration    |       Express <=> Postgres       |                                          Connect your server to your database                                          |
|   Express Configuration    |        Express <=> React         |                                      Connect your server to your create-react-app                                      |

<br />
<hr />
<br >

### Day 2 - Front-end

|          General           |                    Specific                    |                                                           How you'll be tested                                                            |
| :------------------------: | :--------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|     Use basic Git flow     |                   git clone                    |                                      clone a template version of this repository onto your computer                                       |
|     Use basic Git flow     |                    git add                     |                                                   add your changes to the staging area                                                    |
|     Use basic Git flow     |                   git commit                   |                                                 commit your changes from the stating area                                                 |
|     Use basic Git flow     |                    git push                    |                                                        push your changes to GitHub                                                        |
|  Constants and Variables   |                   const/let                    |                              Use const and let throughout your front-end to declare variables and constants                               |
|        Control Flow        |             conditional rendering              |                             Use control flow to determine whether something appears on the DOM, based on data                             |
|        Control Flow        |             Snack Health: Boolean              |                   Write some logic to determine the health of the snack, with given parameters (see more details below)                   |
| Solve problem with Arrays  |               Change Snack Name                |                                              Iterate over an array in order to display data                                               |
| Solve problem with Arrays  |                  Update Array                  |                Update an array after making a new snack, or deleting a snack, so that the changes are reflected in the DOM                |
| Solve problem with Objects |                  Snack Object                  |                                                  Access and change values inside objects                                                  |
|  Use promises/async await  |                  Fetch/Axios                   |                                  Make calls to the server and wait for response before running more code                                  |
|            NPM             |              Install NPM packages              |                            Install packages already listed in the `package.json` , add new packages, as needed                            |
|           React            |                create-react-app                |                                  Use Express to build a JSON API that will be used by a React front-end                                   |
|       RESTful Routes       | Use React-Router-DOM and follow RESTful Routes |                               Use the RESTful pattern to build routes that mirror & consume the express API                               |
|        React props         |          Customize a view with props           |                                                    Build a Schema for the snacks model                                                    |
|   React hooks/lifecycle    |            Create an form in React             |                                         Demonstrate ability to work with state by building a form                                         |
|   React hooks/lifecycle    |             Create a delete route              | Demonstrate ability to work with state by creating a functional delete button that updates state, as well as the database on the back-end |
|   React hooks/lifecycle    |        Make server request on page load        |                          Use lifecycle method(s) to load data from the API at the appropriate time into the DOM                           |
|         Basic HTML         |                    Use JSX                     |                                                 Use JSX to build HTML components in react                                                 |
|         Basic CSS          |                    Use CSS                     |                                                         change font and font size                                                         |
|         Basic CSS          |                    Use CSS                     |                                                  change font color and background-color                                                   |
|         Basic CSS          |                    Use CSS                     |                                                        change padding and margins                                                         |
|         Basic CSS          |                    Use CSS                     |                                                                align text                                                                 |
|         Basic CSS          |                    Use CSS                     |                                                 change elements default display property                                                  |
|         CSS Layout         |                  CSS Flexbox                   |                                          Use properties for flex parent items to create a layout                                          |
|         CSS Layout         |                  CSS Flexbox                   |                                         Use properties for flex children items to create a layout                                         |
