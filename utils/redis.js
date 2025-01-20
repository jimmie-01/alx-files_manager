const Redis = require('ioredis');


class RedisClient {
	constructor () {
		this.client = new Redis(); // Create a new Redis Client

		// Handle Error for Redis connection
		this.client.on('error', (err) => {
			console.error('Redis error:', err);
		});
	}

	// Check if the Redis connection is alive
	isAlive() {
		if (this.client.status === 'ready') {
			return true;
		}else {
			return false;
		}
	}

	// Get the value for a given key
	async get(key) {
		try {
			const value = await this.client.get(key);
			return value;
		} catch (err) {
			console.error('Error getting value from Redis: ', err);
		}
	}

	// Set a key-value pair in Redis with expiration
	async set(key, value, durationInSeconds) {
		try {
			await this.client.set(key, value, 'EX', durationInSeconds);
		} catch (err) {
			console.error('Error setting value in Redis:', err);
		}
	}

	// Delete a key from Redis
	async del(key) {
		try {
			await this.client.del(key);
		} catch (err) {
			console.error('Error deleting key from Redis:', err);
		}
	}
}

// An instance of Redis Client
const redisClient = new RedisClient();

module.exports = redisClient;
