const Client = required("pg");

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD, 
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
}

module.exports.handler = async () => {
   const client = new Client(dbOptions);

   await client.connect();

    try {
        const ddlResult = await client.query(
            `create table if not exists carts (
                user_id
            )`
        )
    } catch (error) {
        console.error('Error DB request: ', error)
    }
    finally {
        client.end();
    }
};
