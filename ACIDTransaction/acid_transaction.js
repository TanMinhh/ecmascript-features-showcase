const { MongoClient } = require('mongodb');

async function executeTransaction() {
    const client = new MongoClient(''); // MongoDB string connection uri (cloud service) - MongoDB replica set uri (local)
    await client.connect();

    const db = client.db('bank');
    const accounts = db.collection('accounts');
    const session = client.startSession();

    try {
        session.startTransaction();

        await accounts.updateOne(
            { _id: 'account1' },
            { $inc: { balance: -500 } },
            { session }
        );

        await accounts.updateOne(
            { _id: 'account2' },
            { $inc: { balance: 500 } },
            { session }
        );

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
    } finally {
        await session.endSession();
        await client.close();
    }
}

executeTransaction();