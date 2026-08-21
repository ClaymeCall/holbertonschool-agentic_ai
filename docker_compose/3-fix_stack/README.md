## Errors I patched
- wrong depends_on statement  `databse` -> `db` (match the db service)
- Duplicate 8080 host port mapping. Moved 8080 to 8081 for web service
- No password given to db service : added .env file for it that contains necessary env variables
