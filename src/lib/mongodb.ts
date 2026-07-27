import mongoose from "mongoose";

// Ensure the env var is present at runtime
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

// add a typed global to cache the mongoose connection between hot reloads
type MongooseCache = {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            mongoose?: MongooseCache;
        }
    }
}

// Ensure cached is always initialized so it's not possibly undefined when used
// Initialize global.mongoose if not present to ensure consistent typing
if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

// global.mongoose is initialized above; assert non-null to satisfy TS
let cached: MongooseCache = global.mongoose as MongooseCache;

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        // MONGODB_URI is guaranteed above; assert to satisfy TS
        cached.promise = mongoose.connect(
            MONGODB_URI as string,
            {
                serverSelectionTimeoutMS: 10000,
            }
        )as Promise<typeof mongoose>;
    }

    cached.conn = await cached.promise;
    return cached.conn;
}