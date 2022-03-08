# Instruccions generals

- Crear usuari en bdd:

```
db.createUser(
{ user: "appDBUser", pwd: "appDBUser",
 roles: [{ role: "readWrite", db:"appDB"}]})
```

- Crear i configurar .env a l'arrel:

```
MONGODB_USER=<your database username>
MONGODB_PASSWORD=<your database password>
MONGODB_HOST=<your database host>
MONGODB_PORT=<your database port>
MONGODB_DATABASE=<your database name>
```
