// import mongoose from 'mongoose';

// // const MONGODB_URI = ;
// const MONGODB_URI = 'mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0';

// if (!MONGODB_URI) {
//   console.error('MONGODB_URI is not defined. Please check your .env.local file.');
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       serverSelectionTimeoutMS: 2000, // Keep trying to send operations for 2 seconds
//       socketTimeoutMS: 10000, // Close sockets after 10 seconds of inactivity
//       connectTimeoutMS: 5000, // Give up initial connection after 5 seconds
//     };

//     cached.promise = mongoose.connect(MONGODB_URI!, opts).catch((error) => {
//       console.warn('MongoDB connection failed, using fallback mode:', error.message);
//       cached.promise = null;
//       throw error; // Re-throw to maintain the promise type
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     if (!cached.conn) {
//       console.warn('MongoDB not available, running in fallback mode');
//     }
//   } catch (e) {
//     cached.promise = null;
//     console.warn('MongoDB connection error, running in fallback mode:', e);
//   }

//   return cached.conn;
// }

// export default connectDB;


// src/lib/mongodb.ts
// import mongoose from "mongoose";

// // Hardcoded MongoDB URI (replace with your actual URI)
// const MONGODB_URI = process.env.MONGODB_URI;
//   // "mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0";

// if (!MONGODB_URI) {
//   throw new Error("MongoDB URI is missing. Please provide a valid URI.");
// }

// // Type for caching connection across hot reloads in dev
// type MongooseCache = {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// };

// // @ts-ignore
// let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
// // @ts-ignore
// global.mongoose = cached;

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       serverSelectionTimeoutMS: 2000,
//       socketTimeoutMS: 10000,
//       connectTimeoutMS: 5000,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts) as Promise<typeof mongoose>;
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;


import mongoose from "mongoose";

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is missing. Please provide a valid URI.");
}

// Type for caching connection across hot reloads
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// @ts-ignore
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
// @ts-ignore
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts) as Promise<typeof mongoose>;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
