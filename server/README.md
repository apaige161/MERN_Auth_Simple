# Basic auth app
- MERN Stack
- Need a ned .env file to store
    - JWT_SECRET
    - MDB_CONNECT
- Able to create user, login, logout
- only logged in users will be able to see customers
- sessions via cookies, set with cors on backend, axios on front






### TODO:
- add admin/super user for admin privilages
- add admin page to CRUD things that the end user will consume


### GOTCHAs
- use the auth middleware to validate token on the post request, see customerRouter.js for an example
- middleware takes care of the CORS error


### Tutuorial 
https://www.youtube.com/watch?v=jwkfnC_H80g&list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU&index=11