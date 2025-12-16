# Insecure app to demonstrate vulnerabilities. University of Helsinki cyber security MOOC.
#### A web app demonstrating 5 of the top 10 vulnerabilities in 2021 from OWASP.

# Install
First ensure you have Node and NPM installed on your system. Either use NVM or download installer from the following link:
<https://nodejs.org/en/download>

Then install version 18 of postgreSQL.
<https://www.postgresql.org/download/>

To install project dependencies, go to the root of your project (where the package.json file is), and run:
```
npm install
```

# Create the database
1. If you have psql, create the database by typing
   
```
CREATE DATABASE cyber_security;
```
Or use whatever method you wish to create the database.

2. Once you have created the database, run the following command from the root of your project to create the the tables. Replace user, password (if there is one), and port to the ones for your database.

```
node db/initDB.js postgresql://user:password@localhost:5432/cyber_security
```
 
3. Set up a `.env` file in the root of your project. Containing the following:
  ```
  SESSION_SECRET="<session_secret_key>"   
PGHOST=localhost
PGUSER=<postgres user>
PGPASSWORD=<postgres password>  
PGDATABASE=<database_name>
PGPORT=5432  
```
They should be the same as the ones in the connection string in step 2.

The database will now have an admin user with username: `admin` and password `veryInsecurePassword` for demonstration purposes.

# Run the app
From the root of the project, from your project root directory, in terminal type:
```npm run dev```
In your browser navigate to `http://127.0.0.1:3000` to see the application.

# List of vulnerabilities and fixes

### A01 Broken Access Control

Broken access control blah blah blah...

### A02 Cryptographic Failures


### A03 Injections


### A05 Security Misconfiguration


### A09 Security Logging and Monitoring Failures
