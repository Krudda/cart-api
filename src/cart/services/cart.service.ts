import { Injectable } from '@nestjs/common';
import Client from 'pg';
import { v4 } from 'uuid';
import { Cart } from '../models';

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
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `select * from carts where user_id='${userId}';`;
      const { rows } = await client.query(query);
      return rows;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }

  async createByUserId(user_id: string) {
    const status = 'ORDERED';
    const created_at = new Date();

    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `insert into carts (user_id, created_at, updated_at, delivery, comments, status, total)
        values ('${user_id}', '${created_at}', '${created_at}', '${status}');`;

      const created = await client.query(query);
      return created;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id: cart_id, ...rest } = await this.findByUserId(userId);

    const client = new Client(dbOptions);
    await client.connect();

    try {
      const queryItems = `select * from cart_items where cart_id='${cart_id}';`;
      const { rows: cartItems } = await client.query(queryItems);
      return cartItems;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }

  async removeByUserId(userId: string): Promise<void> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const queryItems = `delete from carts where user_id='${userId}';`;
      const { rows } = await client.query(queryItems);
      return rows;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }
}
