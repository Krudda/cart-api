import { Injectable } from '@nestjs/common';
import Client from 'pg';
import { Order } from '../models';

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
export class OrderService {
  private orders: Record<string, Order> = {}

  async findById(orderId: string): Promise<Order> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `select * from orders where id='${orderId}';`;
      const { rows } = await client.query(query);
      return rows;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  };

  async create(data: Order) {
    const { userId: user_id, cartId: cart_id, payment, delivery, comments, total } = data;
    const status = 'ORDERED';

    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `insert into orders (user_id, cart_id, payment, delivery, comments, status, total)
        values ('${user_id}', '${cart_id}', '${payment}', '${delivery}', '${comments}', '${status}', '${total}');`;

      const created = await client.query(query);
      return created;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }

  async update(orderId: string, data: Order) {
    const { cartId: cart_id, payment, delivery, comments, status, total } = data;
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const client = new Client(dbOptions);
    await client.connect();

    try {
      const query = `update orders
        set 
          cart_id='${cart_id}'
          payment='${payment}'
          delivery='${delivery}'
          comments='${comments}'
          status='${status}'
          total='${total}'
        where id='${orderId}';`;

      const updated = await client.query(query);
      return updated;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
    finally {
      client.end();
    }
  }
}
