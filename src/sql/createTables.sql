create extension if not exists "uuid-ossp"

create table users (
	id uuid primary key default uuid_generate_v4(),
	name text not null,
	email text,
	password text 
)

CREATE TYPE "cart_type_enum" AS ENUM('OPEN', 'ORDERED')

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status "cart_type_enum",
	foreign key ("user_id") references "users" ("id")
)

create table cart_items (
	cart_id uuid not null,
	product_id uuid not null,
	count integer not null,
	foreign key ("cart_id") references "carts" ("id")
)

create table orders (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
	cart_id uuid not null,
	payment json,
	delivery json,
	comments text,
	status "cart_type_enum",
	total integer,
	foreign key ("cart_id") references "carts" ("id")
)