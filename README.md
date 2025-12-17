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
`npm run dev`
In your browser navigate to `http://127.0.0.1:3000` to see the application.

# List of vulnerabilities and fixes

### A01:2021 Broken Access Control

<https://github.com/RaihanSharif/Cyber_Security_base_2025_project1/blob/edf4eb1973339ebe7c5aed5ac426fbfc8e7271d2/controllers/accountController.js#L63>
In this example, the admin page is viewable by using a url query parameter `/admin/admin?=true`. This breaks access control by allowing users without admin privilage to access the admin page. This could potentially expose sensitive data, and if there are no further authetintication or authorization checks (e.g. deleteing a user), it could lead to data intengrity failure.

In order to do this more securely, the developer should not trust user input and use it to determine access control. Instead of using client side checking which is easily edited to by:
<https://github.com/RaihanSharif/Cyber_Security_base_2025_project1/blob/db2075f5e3db22f50dd351a84e137d6cb73cc43f/controllers/accountController.js#L64>

In this way, the application checks that there is a currently logged in user, and that the user has an `is_admin` attribute set to true. This cannot be accessed or edited client side.

### A02:2021 Cryptographic Failures

One way cryptographic failure can occur is the improper use of hashing algorithms, namely, the use of general purpose or fast hashing algorithms like SHA-256 for hashing passwords. Such algorithms prioritise the speed, which allows attackers to try many different hashes to brute force a password. Another is the use of outdated hashing algorithms such as MD5. See below which uses an insecure outdated hashing algorithm, but also does not salt the hash, making it more vulnerable:
<https://github.com/RaihanSharif/Cyber_Security_base_2025_project1/blob/e4a8098edb6fb85eac0873daab3ffbe3e0b27069/controllers/accountController.js#L32>
Instead, always use a dedicated password hashing libraries, and salt the hash in order to randomize the hash, see below:
<https://github.com/RaihanSharif/Cyber_Security_base_2025_project1/blob/e4a8098edb6fb85eac0873daab3ffbe3e0b27069/controllers/accountController.js#L33>
The bcrypt library uses a deliberately slow hashing algorithm, it also creates a cryptographically secure salt, which it stores with the hash. Bcrypt is also well tested, making it a better choice than creating something from scratch.

### A03:2021 Injections

Unwated, hostile code can be injected into the application if user input is not properly sanitzed or validated. One common form of injection is SQL injection. Hostile actors can insert SQL queries where user input is concatenated with application SQL queries without using parameterised queries, like in the example below:
<>

### A05:2021 Security Misconfiguration

### A09 Security Logging and Monitoring Failures
