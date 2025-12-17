const { Client } = require("pg");

const { argv } = require("node:process");

const SQL = `CREATE TABLE IF NOT EXISTS account (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false);

    CREATE TABLE IF NOT EXISTS post (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES account(id) ON DELETE CASCADE);`;

async function main(connStr) {
    console.log("initializing db...");
    const client = new Client({
        connectionString: connStr, //  postgresql://raihansharif@localhost:5432/members_only for localhost
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main(argv[2]);
