import mongoose from 'mongoose';

// Define the structure for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

// Persist the cache globally
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose.
 * 
 * In development, Next.js hot reloading can cause multiple connections.
 * This function caches the connection to prevent connection exhaustion.
 * 
 * @returns Promise that resolves to the Mongoose instance
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable Mongoose buffering
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, options);
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise on error so the next call will retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
