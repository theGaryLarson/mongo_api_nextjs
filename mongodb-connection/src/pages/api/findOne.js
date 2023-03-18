// pages/api/findOne.js
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;

const uri = `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    const { database, collection, filter, projection } = req.body;

    try {
        await client.connect();
        const db = client.db(database);
        const col = db.collection(collection);
        const result = await col.findOne(filter, { projection });

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching data");
    } finally {
        // Ensures that the client's connection will close when you exit the program
        // Optimize: for multiple users, it's good to maintain an always-open connection.
        await client.close();
    }
}
