import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connectDB from '../config';
import user from '../models/user';
import room from '../models/room';
import reservation from '../models/reservation';
import { todayFormatted } from '@/lib/utils/dayjs';

const seedData = async () => {
  await connectDB();

  const passwordEncrypted = await bcrypt.hash('11111', 10);

  try {
    // Explicitly creating collections (though not strictly necessary)
    // to ensure they exist before inserting data.
    await user.createCollection();
    await room.createCollection();
    await reservation.createCollection();

    // Create admin user
    const adminUser = await user.create({
      name: 'Admin User',
      email: 'admin@example.com',
      username: 'admin',
      password: passwordEncrypted,
      role: 'admin',
      createdAt: todayFormatted,
    });

    // Create basic user
    const basicUser = await user.create({
      name: 'User One',
      email: 'user1@example.com',
      username: 'user1',
      password: passwordEncrypted,
      role: 'user',
      createdAt: todayFormatted,
    });

    // Create room
    const roomOne = await room.create({
      name: 'Room One',
      description: 'A comfortable room with basic amenities.',
      status: 'Available',
      address: '123 Main Street',
      price: 100,
      rating: 4.5,
      images: ['https://example.com/room1.jpg'],
      category: 'Standard',
      createdAt: todayFormatted,
      capacity: 2,
      occupancy: 0,
      bedCapacity: 1,
      amenities: {
        isBreakfast: true,
        isInternet: true,
        isPets: false,
      },
      user: adminUser._id,
    });

    // Create reservation
    const reservationOne = await reservation.create({
      room: roomOne._id,
      user: basicUser._id,
      checkIn: '2024-10-25',
      checkOut: '2024-10-30',
      stayDuration: 5,
      bill: 500,
      isBillPaid: true,
      billPaidAt: '2024-10-25',
      createdAt: todayFormatted,
    });

    console.log('Database seeded successfully with initial data.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
