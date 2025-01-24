const { MongoClient } = require('mongodb');

// Load environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
	constructor() {
		const uri = `mongodb://${DB_HOST}:${DB_PORT}`;
		this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		this.db = null;
	}

	async connect() {
		if (!this.db) {
			try {
				await this.client.db(DB_DATABASE);
				console.log('Connected to MongoDB');
			} catch (error) {
				console.error('Failed to connect to MongoDB', error);
			}
		}
	}

	async isAlive() {
		try {
			await this.connect();
			const serverStatus = await this.db.command({ ping: 1 });
			return serverStatus.ok === 1;
		} catch (error) {
			console.error('Error checking MongoDB connection:', error);
			return false;
		}
	}

	async nbUsers() {
		try {
			const userCollection = this.db.collection('user');
			const count = await userCollection.countDocuments();
			return count;
		} catch (error) {
			console.error('Error fetching user count:', error);
			return 0;
		}
	}

	async nbFiles() {
		try {
			const filesCollection = this.db.collection('files');
			const count = await filesCollection.countDocuments();
			return count;
		} catch (error) {
			console.error('Error fetching file count:', error);
			return 0;
		}
	}
}

//Create an instance of DBClient
const dbClient = new DBClient();

module.exports = { dbClient };
