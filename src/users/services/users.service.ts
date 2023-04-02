import { Injectable } from '@nestjs/common';
import Client from 'pg';
import { User } from '../models';

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
@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  async findOne(userId: string): Promise<User> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `select * from users where id='${userId}';`;
      const { rows } = await client.query(query);
      return rows;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }

  async createOne({ name, email, password }: User): Promise<User> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `insert into users (name, email, password)
        values ('${name}', '${email}', '${password}');`;

      const created = await client.query(query);
      return created;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }
}
