// lib/mongodb.js
import { MongoClient } from "mongodb";

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;

const uri = `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;

let cachedClient = null;
let cachedDb = null;

// export async function connectToDatabase() {
//     if (cachedClient && cachedDb) {
//         return { client: cachedClient, db: cachedDb };
//     }
//
//     const client = await MongoClient.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//
//     const db = client.db(process.env.MONGODB_DB);
//
//     cachedClient = client;
//     cachedDb = db;
//
//     return { client, db };
// }
