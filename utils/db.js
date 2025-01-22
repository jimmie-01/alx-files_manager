const { MongoClient } = require('mongodb');

class DBClient {
	constructor (uri, dbName) {
		this.uri = uri;
		this.dbName = dbName;
		this.client = null;
		this.db = null;
	}

	// Connect to MongoDb
	async isAlive() {
		try {
			this.client = new MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true });

			// connect to server
			await this.client.connect();

			// select database
			this.db = this.client.db(this.dbName);
			console.log('Connected to MongoDB');
			return true;
		} catch (err) {
			console.error('Error connecting to MongoDB', err);
			return false;
		}
	}
}

