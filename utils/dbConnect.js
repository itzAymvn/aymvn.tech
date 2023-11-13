import mongoose from "mongoose";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

let cachedDb = null; // This is to cache the database connection

export async function connectToDatabase() {
    /*
     * If the database connection is cached,
     * use it instead of creating a new connection
     * This is to prevent any memory leaks and to improve performance
     * */

    if (cachedDb) {
        return cachedDb;
    }

    const client = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    cachedDb = client.connection.db;
    return cachedDb;
}

export default connectToDatabase;
