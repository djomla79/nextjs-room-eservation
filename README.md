# NEXTJS-ROOM-ESERVATION-APP

## Description

This is a testing project developed with **Next.js 14**. The app is a simple room reservation system that includes authentication, user roles (admin and user), and basic CRUD operations. The project demonstrates the use of various libraries and tools like `next-auth` for authentication, `MongoDB` as the database, `@nextui-org/react` for UI components, and `react-hook-form` with `zod` for form handling and validation and others.

## Features

- **Admin and User Authentication & Authorization**

  - Users can register and log in using **NextAuth.js**.
  - Admins and users have different roles and access levels.

- **Models**:

  - **Room**: Rooms that can be managed by admins and reserved by users.
  - **Reservation**: Reservation records that track user bookings.

- **Admin Functionalities**:

  - View, add, update, and delete rooms.
  - View users and their reservations.

  To access the admin functionalities, you may need to seed or manually create an admin user in your MongoDB database, in other words, set role to admin instead of user which is set by default.

- **User Functionalities**:

  - Register and log in.
  - View available rooms.
  - Make a reservation for a room using its room ID.

- **Simple UI**:
  - Admin and user dashboards with relevant actions for each role.
  - Room management, user management, and reservation management.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **MongoDB**: Set up your MongoDB database on [MongoDB Atlas](https://www.mongodb.com/atlas/database). You will need to provide the environment variables in your `.env.local` file.
- Create a `.env.local` file in the root directory and add the following environment variables:

```
BASE_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

NEXTAUTH_SECRET="your-next-auth-secret"

JWT_SECRET_KEY="some-secret-key"

MONGO_DB_USER="your-mongodb-username"
MONGO_DB_PASSWORD="your-mongodb-password"
MONGO_DB_CLUSTER="your-mongodb-atlas-cluster" // e.g. "cluster0.dty1rt7.mongodb.net"
MONGO_DB_NAME="your-database-name"
```

### Installation

1. Clone the repository
2. Install dependencies with `npm install`

### Seeding the Database

To populate your MongoDB database with initial data (admin user, sample room, and reservation), you can use the seed script. This script will set up essential collections and add sample entries for users, rooms, and reservations.

#### Running the Seed Script

To run the seed script with `npm run seed`, add the following command to your `package.json` file under `"scripts"`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "seed": "ts-node app/server/mongo/seed/index.ts"
}
```

### Run the app

Start dev server with `npm run dev`
