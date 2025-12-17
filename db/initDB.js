const { Client } = require("pg");

const { argv } = require("node:process");

const SQL = `CREATE TABLE IF NOT EXISTS account (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false);

    CREATE TABLE IF NOT EXISTS post (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL,
    user_id INT REFERENCES account(id) ON DELETE CASCADE);`;

async function main(connStr) {
    console.log("initializing db...");
    const client = new Client({
        connectionString: connStr, //  postgresql://<username>@localhost:5432/<db_name> for localhost
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main(argv[2]);
