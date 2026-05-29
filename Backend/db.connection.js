const mongoose= require("mongoose")



/**
 * Connect to the mongo database.
 */
const connectToDatabase = async () => {
    try {        
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        throw error
    }
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports= {clearDatabase,closeDatabase,connectToDatabase}