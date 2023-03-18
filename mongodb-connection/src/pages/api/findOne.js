// pages/api/findOne.js
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { database, collection, filter, projection } = req.body;

    try {
        const { db } = await connectToDatabase();
        const result = await db
            .collection(collection)
            .findOne(filter, { projection });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from MongoDB" });
    }
}
